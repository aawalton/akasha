import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { DRY_RUN } from "akasha/commands/pages/infrastructure/service/service-slug-arguing/service-slug-arguing.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  ourStaged,
  planFor,
  strandedAmong,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"

const NOT_SWEPT =
  "dry-run\tnothing was taken away; run it again without `--dry-run` to carry it out"

const ALL_ACCOUNTED =
  "nothing\tevery unit akasha owns, installed and staged alike, is accounted for by a page"

export function infrastructureServiceSweep(argv: readonly string[], given: Given): Answer {
  const dryRun = argv.includes(DRY_RUN)
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)

  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`${given.calledAs}\` takes`, INPUT)
  }

  const slug = named[0]
  if (slug !== undefined) {
    return refused(
      `this reaches every unit akasha owns rather than one service, and \`${slug}\` was named`,
      INPUT
    )
  }

  const read = everyService(given.root)
  if ("refused" in read) return refused(read.refused, DATA)

  const home = homeAt()
  if (home === null) {
    return refused("no home directory is stated, so no unit has anywhere to sit", OPERATIONAL)
  }

  const owned = ourInstalled(home)
  const plan = planFor(read.services, owned)
  const remove = plan.remove
  const strand = strandedAmong(ourStaged(home), owned, plan)
  if (remove.length === 0 && strand.length === 0) {
    return { report: [ALL_ACCOUNTED], refusals: [], code: OK }
  }

  const report = [
    ...remove.map((name) => `remove\t${name}`),
    ...strand.map((name) => `stranded\t${name}`),
  ]
  if (dryRun) return { report: [...report, NOT_SWEPT], refusals: [], code: OK }

  const done = installing(home, { write: new Map(), enable: [], stop: [], remove, strand })
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: OK }
}
