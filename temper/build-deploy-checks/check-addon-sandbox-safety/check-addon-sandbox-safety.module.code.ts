import { relative, resolve } from "node:path"
import {
  formatIssue,
  type Issue,
  scanBundleFile,
} from "../addon-banned-symbols/addon-banned-symbols.module.code.ts"
import {
  ADDON_BUNDLE_UNIT,
  type AddonDistBundles,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "../addon-dist-bundles/addon-dist-bundles.module.code.ts"
import { parseArgs as parseCliArgs } from "../cli-args/cli-args.module.code.ts"
import { errnoCode, errorMessage } from "../error-message/error-message.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"

function parseArgs(argv: readonly string[]): { singleFile: string | null } {
  try {
    const { flags } = parseCliArgs(argv, { file: { kind: "string" } }, { passthrough: true })
    return { singleFile: flags.file ?? null }
  } catch {
    return { singleFile: null }
  }
}

const GATE = "addon-sandbox-safety"

export interface AddonSandboxSafetyOptions {
  readonly singleFile: string | null
}

export function runAddonSandboxSafety({ singleFile }: AddonSandboxSafetyOptions): number {
  let files: readonly string[]
  let bundles: AddonDistBundles | null = null
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    bundles = collectAddonDistBundles()
    files = bundles.files
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const allIssues: Issue[] = []
  let scanned = 0
  for (const file of files) {
    let issues: readonly Issue[]
    try {
      issues = scanBundleFile(file)
    } catch (err) {
      if (errnoCode(err) === "ENOENT" && bundles !== null) {
        continue
      }
      const readBound = renderPopulationBound({
        examined: scanned,
        declared: files.length,
        unit: ADDON_BUNDLE_UNIT,
      })
      console.error(
        `${GATE}: failed to read ${file}: ${errorMessage(err)} ${readBound} — this gate certifies nothing it could not read.`
      )
      return 2
    }
    allIssues.push(...issues)
    scanned++
  }
  if (scanned === 0 && bundles !== null) {
    return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const bound = renderPopulationBound({
    examined: scanned,
    declared: files.length,
    unit: ADDON_BUNDLE_UNIT,
  })
  if (allIssues.length === 0) {
    console.log(`${GATE}: no banned sandbox symbols ${bound}`)
    return 0
  }

  const cwd = process.cwd()
  for (const issue of allIssues) {
    const displayFile = issue.file.startsWith(cwd) ? relative(cwd, issue.file) : issue.file
    console.error(formatIssue({ ...issue, file: displayFile }))
  }
  console.error("")
  console.error(
    `${GATE}: ${allIssues.length} banned symbol(s) found ${bound} — see #7209 (checker) and #7179 (incident)`
  )
  return 1
}

export function main(argv: readonly string[] = process.argv.slice(2)): number {
  return runAddonSandboxSafety(parseArgs(argv))
}

if (import.meta.main) {
  process.exit(main())
}
