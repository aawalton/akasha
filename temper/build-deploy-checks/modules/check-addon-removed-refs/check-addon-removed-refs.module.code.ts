import { relative, resolve } from "node:path"
import { parseSingleFileFlag } from "akasha/temper/build-deploy-checks/cli-args/cli-args.module.code.ts"
import { errorMessage } from "akasha/temper/build-deploy-checks/error-message/error-message.module.code.ts"
import {
  ADDON_BUNDLE_UNIT,
  type AddonDistBundles,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "akasha/temper/build-deploy-checks/modules/addon-dist-bundles/addon-dist-bundles.module.code.ts"
import {
  formatIssue,
  type RemovedRefIssue,
  scanBundleFile,
} from "akasha/temper/build-deploy-checks/modules/addon-removed-refs/addon-removed-refs.module.code.ts"
import { renderPopulationBound } from "akasha/temper/build-deploy-checks/population-bound/population-bound.module.code.ts"
import { errnoCodeOf } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

const GATE = "addon-removed-refs"

export interface AddonRemovedRefsOptions {
  readonly singleFile: string | null
}

function runAddonRemovedRefs({ singleFile }: AddonRemovedRefsOptions): number {
  let files: readonly string[]
  let bundles: AddonDistBundles | null = null
  if (singleFile !== null) {
    files = [resolve(singleFile)]
  } else {
    bundles = collectAddonDistBundles()
    files = bundles.files
    if (files.length === 0) return refuseAddonDistPopulation(GATE, bundles, 0)
  }

  const allIssues: RemovedRefIssue[] = []
  let scanned = 0
  for (const file of files) {
    let issues: readonly RemovedRefIssue[]
    try {
      issues = scanBundleFile(file)
    } catch (err) {
      if (errnoCodeOf(err) === "ENOENT") {
        continue
      }
      console.error(`${GATE}: failed to read ${file}: ${errorMessage(err)}`)
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
    console.log(`${GATE}: no removed external-addon references ${bound}`)
    return 0
  }

  const cwd = process.cwd()
  for (const issue of allIssues) {
    const displayFile = issue.file.startsWith(cwd) ? relative(cwd, issue.file) : issue.file
    console.error(formatIssue({ ...issue, file: displayFile }))
  }
  console.error("")
  console.error(
    `${GATE}: ${allIssues.length} removed external-addon reference(s) found ${bound} — see #12106 (gate); each line above names what took the removed addon's place`
  )
  return 1
}

function main(argv: readonly string[] = process.argv.slice(2)): number {
  return runAddonRemovedRefs(parseSingleFileFlag(argv))
}

if (import.meta.main) {
  process.exit(main())
}
