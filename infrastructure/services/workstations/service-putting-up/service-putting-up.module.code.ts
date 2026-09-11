import {
  homeAt,
  installing,
  ourInstalled,
  planFor,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"

const DATA = 2
const OPERATIONAL = 3
const NOT_WRITTEN = "dry-run\tnothing was written; run it again without `--dry-run` to carry it out"

export interface PutUp {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export function putUpEvery(
  root: string,
  dryRun: boolean,
  restarting: ReadonlySet<string> = new Set()
): PutUp {
  const read = everyService(root)
  if ("refused" in read) return { report: [], refusals: [read.refused], code: DATA }

  const home = homeAt()
  if (home === null) {
    return {
      report: [],
      refusals: ["no home directory is stated, so no unit has anywhere to sit"],
      code: OPERATIONAL,
    }
  }

  const plan = planFor(read.services, ourInstalled(home), restarting)
  const report: string[] = [`service-workstation\t${read.services.length} service(s)`]
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.restart ?? []) report.push(`restart\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)

  if (dryRun) return { report: [...report, NOT_WRITTEN], refusals: [], code: 0 }

  const done = installing(home, plan)
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: 0 }
}
