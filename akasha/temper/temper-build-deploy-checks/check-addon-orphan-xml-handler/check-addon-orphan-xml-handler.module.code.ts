import { readFileSync } from "node:fs"
import { relative } from "node:path"
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
import {
  addonMarkupFiles,
  addonSourceFiles,
} from "../addon-source-files/addon-source-files.module.code.ts"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "../cli-args/cli-args.module.code.ts"
import { errorMessage } from "../error-message/error-message.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"

const PREFIX = "[addon-orphan-xml-handler]"

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
    const { code, machineWritten } = addonSourceFiles(addon.dir)
    const markup = addonMarkupFiles(addon.dir)
    codeHeld += code.length + machineWritten.length
    markupHeld += markup.own.length + markup.copies.length

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

    for (const markupFile of markup.own) {
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
    `${PREFIX} not examined: ${scan.markupHeld - scan.markupRead} markup file(s), held by the ` +
      `${scan.addonsWalked - scan.addonsPublishing} add-on(s) of ${scan.addonsWalked} publishing no global namespace ` +
      `or written by a build. Also ${scan.codeHeld - scan.codeRead} machine-written code file(s), ` +
      `so a member defined only there reads as defined nowhere.\n`
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
