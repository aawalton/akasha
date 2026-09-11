import {
  homeAt,
  installing,
  ourInstalled,
  ownedByService,
  planFor,
} from "akasha/services/workstations/service-installing/service-installing.module.code.ts"
import { readFor } from "akasha/services/workstations/service-reading/service-reading.module.code.ts"

const DATA = 2
const OPERATIONAL = 3
const NOT_WRITTEN = "dry-run\tnothing was written; run it again without `--dry-run` to carry it out"

export interface PutUp {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export function putUpService(root: string, slug: string, dryRun: boolean): PutUp {
  const read = readFor(root, slug)
  if ("refused" in read) return { report: [], refusals: [read.refused], code: DATA }

  const home = homeAt()
  if (home === null) {
    return {
      report: [],
      refusals: ["no home directory is stated, so no unit has anywhere to sit"],
      code: OPERATIONAL,
    }
  }

  const plan = planFor(read.services, ownedByService(ourInstalled(home), slug))
  const report: string[] = [`workstation-service\t${slug}`]
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)

  if (dryRun) return { report: [...report, NOT_WRITTEN], refusals: [], code: 0 }

  const done = installing(home, plan)
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: 0 }
}
