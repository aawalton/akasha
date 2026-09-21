import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  type Plan,
  planFor,
  systemctl,
} from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"

export type Planned = {
  readonly report: readonly string[]
  readonly home: string
  readonly plan: Plan
}

export function plannedEvery(
  root: string,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = ""
): Planned | Answer {
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
  return { report, home, plan }
}

export function putUpEvery(
  root: string,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  up: string[] = []
): Answer {
  const planned = plannedEvery(root, restarting, codeAt)
  if (!("plan" in planned)) return planned

  const done = installing(planned.home, planned.plan, systemctl, up)
  const said = [...planned.report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return answeredWith(said, done.refused, OPERATIONAL)
  return told(said)
}
