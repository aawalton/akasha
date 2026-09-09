import { readFileSync } from "node:fs"
import { relative } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import {
  collectDeferredPublishedFields,
  collectHookEagerCaptureIssues,
  type HookEagerCaptureIssue,
  parseAddonSource,
} from "../addon-hook-eager-capture/addon-hook-eager-capture.module.code.ts"
import {
  addonRosterIsEmpty,
  EMPTY_ADDON_ROSTER_HINT,
} from "../addon-roster-guard/addon-roster-guard.module.code.ts"
import { addonSourceFiles } from "../addon-source-files/addon-source-files.module.code.ts"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "../cli-args/cli-args.module.code.ts"
import { errorMessage } from "../error-message/error-message.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"

const PREFIX = "[addon-hook-eager-capture]"

type Scan = {
  readonly issues: readonly HookEagerCaptureIssue[]
  readonly codeHeld: number
  readonly codeRead: number
  readonly addonsWalked: number
}

function scanRoster(repoRoot: string): Scan {
  const issues: HookEagerCaptureIssue[] = []
  let codeHeld = 0
  let codeRead = 0
  let addonsWalked = 0

  for (const addon of listAllAddons({ repoRoot })) {
    addonsWalked += 1
    const { code, machineWritten } = addonSourceFiles(addon.dir)
    codeHeld += code.length + machineWritten.length

    const parsed = code.map((path) => {
      codeRead += 1
      return parseAddonSource(readFileSync(path, "utf8"), relative(repoRoot, path))
    })

    const deferred = new Set<string>()
    for (const source of parsed) {
      for (const key of collectDeferredPublishedFields(source)) deferred.add(key)
    }
    for (const source of parsed) {
      issues.push(...collectHookEagerCaptureIssues(source, deferred))
    }
  }

  return { issues, codeHeld, codeRead, addonsWalked }
}

function reportHuman(scan: Scan): undefined {
  const bound = renderPopulationBound({
    examined: scan.codeRead,
    declared: scan.codeHeld,
    unit: "files",
  })
  if (scan.issues.length === 0) {
    process.stdout.write(
      `${PREFIX} no load-installed hook closes over an eager mutable-field capture. ${bound}\n`
    )
  } else {
    process.stdout.write(
      `${PREFIX} load-time hook eager-capture trap — ${scan.issues.length} finding(s):\n\n`
    )
    for (const issue of scan.issues) process.stdout.write(`  - ${issue.message}\n`)
    process.stdout.write(`\n${PREFIX} ${scan.issues.length} finding(s) ${bound}\n`)
  }
  process.stdout.write(
    `${PREFIX} not examined: ${scan.codeHeld - scan.codeRead} machine-written file(s) across ` +
      `${scan.addonsWalked} add-on(s), each of which compiles and ships.\n`
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
    for (const issue of scan.issues) process.stdout.write(`${JSON.stringify(issue)}\n`)
  } else {
    reportHuman(scan)
  }
  return scan.issues.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
