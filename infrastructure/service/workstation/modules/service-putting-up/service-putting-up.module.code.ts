import { module } from "akasha/code/module/module.page-type.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  commandOf,
  pathOf,
  type Refused,
} from "akasha/infrastructure/service/workstation/modules/run-composing/run-composing.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  type Plan,
  planFor,
  systemctl,
} from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"
import { serviceTelling } from "akasha/infrastructure/service/workstation/modules/service-telling/service-telling.module.ts"
import {
  TELLING_TEMPLATE,
  tellingUnitText,
} from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

const TELLER = `${module.slug}/${serviceTelling.slug}` as const

const THIS_UNIT = "%i"

export type Planned = {
  readonly report: readonly string[]
  readonly home: string
  readonly plan: Plan
}

export function sharedUnitsIn(
  root: string,
  codeAt: string = ""
): ReadonlyMap<string, string> | Refused {
  const said = commandOf(root, { code: TELLER, arguments: [THIS_UNIT] }, codeAt)
  if ("refused" in said) return said
  const pagePath = pathOf(root, TELLER)
  if (typeof pagePath !== "string") return pagePath
  return new Map([[TELLING_TEMPLATE, tellingUnitText({ command: said.command, pagePath })]])
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

  const shared = sharedUnitsIn(root, codeAt)
  if ("refused" in shared) return refusedBy([shared.refused], DATA)

  const plan = planFor(read.services, ourInstalled(home), restarting, shared)
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
