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
  planFor,
  systemctl,
} from "akasha/infrastructure/services/workstations/modules/service-installing/service-installing.module.code.ts"
import { loaderFiles } from "akasha/infrastructure/services/workstations/modules/service-loading/service-loading.module.code.ts"
import {
  everyService,
  runnerCodeIn,
} from "akasha/infrastructure/services/workstations/modules/service-reading/service-reading.module.code.ts"
import type { Service } from "akasha/infrastructure/services/workstations/modules/unit-writing/unit-writing.module.code.ts"

const NOT_WRITTEN = "dry-run\tnothing was written; run it again without `--dry-run` to carry it out"

const PAGES = "pages-service"

function portOf(services: readonly Service[]): number | null {
  for (const one of services) {
    if (one.service.slug === PAGES) return one.service.port ?? null
  }
  return null
}

function saidOfNoPort(): string {
  return `\`${PAGES}\` states no port, so the loader written beside the units reaches nothing`
}

function saidOfNoRunner(): string {
  return "nothing says which file a service is run from, so no loader can reach for it"
}

export function putUpEvery(
  root: string,
  dryRun: boolean,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  up: string[] = [],
  closures: ReadonlyMap<string, ReadonlySet<string>> = new Map()
): Answer {
  const read = everyService(root, codeAt)
  if ("refused" in read) return refusedBy([read.refused], DATA)

  const home = homeAt()
  if (home === null) {
    return refusedBy(["no home directory is stated, so no unit has anywhere to sit"], OPERATIONAL)
  }

  const port = portOf(read.services)
  if (port === null) return refusedBy([saidOfNoPort()], DATA)
  const runner = runnerCodeIn(root)[0]
  if (runner === undefined) return refusedBy([saidOfNoRunner()], DATA)

  const beside = loaderFiles(root, port, runner, closures)
  const plan = planFor(read.services, ourInstalled(home), restarting, beside)
  const report: string[] = [`service-workstation\t${read.services.length} service(s)`]
  report.push(`beside\t${beside.size} file(s)`)
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
