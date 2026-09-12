import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  planFor,
  systemctl,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"

const NOT_WRITTEN = "dry-run\tnothing was written; run it again without `--dry-run` to carry it out"

export function putUpEvery(
  root: string,
  dryRun: boolean,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  up: string[] = []
): Answer {
  const read = everyService(root, codeAt)
  if ("refused" in read) return refusedBy([read.refused], DATA)

  const home = homeAt()
  if (home === null) {
    return refusedBy(["no home directory is stated, so no unit has anywhere to sit"], OPERATIONAL)
  }

  const plan = planFor(read.services, ourInstalled(home), restarting)
  const report: string[] = [`service-workstation\t${read.services.length} service(s)`]
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.restart ?? []) report.push(`restart\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)

  if (dryRun) return told([...report, NOT_WRITTEN])

  const done = installing(home, plan, systemctl, up)
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return answeredWith(said, done.refused, OPERATIONAL)
  return told(said)
}
