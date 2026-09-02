import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import {
  collectSourceSymbols,
  detectOrphans,
  type OrphanFinding,
} from "../addon-orphan-xml-handler/addon-orphan-xml-handler.module.code.ts"
import {
  addonRosterIsEmpty,
  EMPTY_ADDON_ROSTER_HINT,
} from "../addon-roster-guard/addon-roster-guard.module.code.ts"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "../cli-args/cli-args.module.code.ts"
import { errorMessage } from "../error-message/error-message.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"

const PREFIX = "[addon-orphan-xml-handler]"

const NOT_THE_ADDONS_OWN = new Set(["node_modules", "dist", "generated"])

function filesUnder(dir: string, wanted: (path: string) => boolean): readonly string[] {
  const found: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return found
  }
  for (const entry of entries) {
    if (NOT_THE_ADDONS_OWN.has(entry)) continue
    const path = join(dir, entry)
    let isDir = false
    try {
      isDir = statSync(path).isDirectory()
    } catch {
      continue
    }
    if (isDir) {
      found.push(...filesUnder(path, wanted))
      continue
    }
    if (wanted(path)) found.push(path)
  }
  return found
}

function isAddonCode(path: string): boolean {
  if (!path.endsWith(".ts") && !path.endsWith(".tsx")) return false
  if (path.endsWith(".d.ts")) return false
  if (/\.generated\.tsx?$/.test(path)) return false
  if (/\.test\.tsx?$/.test(path)) return false
  if (/\.module\.code\.tsx?$/.test(path)) return true
  return path.split(sep).includes("src")
}

function isMarkup(path: string): boolean {
  return path.endsWith(".xml")
}

type Scan = {
  readonly findings: readonly OrphanFinding[]
  readonly codeHeld: number
  readonly codeRead: number
  readonly markupHeld: number
  readonly markupRead: number
  readonly addonsPublishing: number
  readonly addonsWalked: number
}

function scanRoster(repoRoot: string): Scan {
  const findings: OrphanFinding[] = []
  let codeHeld = 0
  let codeRead = 0
  let markupHeld = 0
  let markupRead = 0
  let addonsPublishing = 0
  let addonsWalked = 0

  for (const addon of listAllAddons({ repoRoot })) {
    addonsWalked += 1
    const code = filesUnder(addon.dir, isAddonCode)
    const markup = filesUnder(addon.dir, isMarkup)
    codeHeld += code.length
    markupHeld += markup.length

    const namespaces = new Set<string>()
    const memberUniverse = new Set<string>()
    for (const file of code) {
      const symbols = collectSourceSymbols(readFileSync(file, "utf8"), relative(repoRoot, file))
      codeRead += 1
      for (const namespace of symbols.namespaces) namespaces.add(namespace)
      for (const member of symbols.members) memberUniverse.add(member)
    }
    if (namespaces.size === 0) continue
    addonsPublishing += 1

    for (const markupFile of markup) {
      const xml = readFileSync(markupFile, "utf8")
      markupRead += 1
      findings.push(
        ...detectOrphans({
          xmlPath: relative(repoRoot, markupFile),
          xml,
          namespaces,
          memberUniverse,
        })
      )
    }
  }

  return {
    findings,
    codeHeld,
    codeRead,
    markupHeld,
    markupRead,
    addonsPublishing,
    addonsWalked,
  }
}

function formatFinding(finding: OrphanFinding): string {
  return `${finding.xmlPath}:${finding.line} <${finding.handler}> — ${finding.message}`
}

function reportHuman(scan: Scan): undefined {
  const bound = renderPopulationBound({
    examined: scan.codeRead + scan.markupRead,
    declared: scan.codeHeld + scan.markupHeld,
    unit: "files",
  })
  if (scan.findings.length === 0) {
    process.stdout.write(`${PREFIX} no orphan inline markup handler in add-on source. ${bound}\n`)
  } else {
    process.stdout.write(
      `${PREFIX} orphan inline markup handler(s) in add-on source — ${scan.findings.length} finding(s):\n\n`
    )
    for (const finding of scan.findings) {
      process.stdout.write(`  - ${formatFinding(finding)}\n`)
    }
    process.stdout.write(`\n${PREFIX} ${scan.findings.length} violation(s) found ${bound}\n`)
  }
  process.stdout.write(
    `${PREFIX} not examined: ${scan.markupHeld - scan.markupRead} markup file(s) held by the ` +
      `${scan.addonsWalked - scan.addonsPublishing} add-on(s) of ${scan.addonsWalked} publishing no global namespace.\n`
  )
}

function main(): 0 | 1 | 2 {
  let asJson = false
  try {
    const { flags } = parseCliArgs(
      process.argv.slice(2),
      { json: { kind: "boolean" } },
      { passthrough: true }
    )
    asJson = flags.json ?? false
  } catch {
    asJson = false
  }

  let scan: Scan
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    scan = scanRoster(repoRoot)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const finding of scan.findings) process.stdout.write(`${JSON.stringify(finding)}\n`)
  } else {
    reportHuman(scan)
  }
  return scan.findings.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
