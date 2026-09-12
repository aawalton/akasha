import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  naming,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { infrastructureServiceSweep as page } from "akasha/commands/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.ts"
import type {
  Done,
  Plan,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  ourStaged,
  planFor,
  strandedAmong,
  systemctl,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"

const NOT_SWEPT =
  "dry-run\tnothing was taken away; run it again without `--dry-run` to carry it out"

const ALL_ACCOUNTED =
  "nothing\tevery unit akasha owns, installed and staged alike, is accounted for by a page"

const EVERY_UNIT = "this reaches every unit akasha owns rather than one service"

export type Sweeping = (home: string, plan: Plan, did: string[]) => Done

export function sweptAway(home: string, plan: Plan, did: string[]): Done {
  return installing(home, plan, systemctl, did)
}

export function sweptEach(
  home: string,
  report: readonly string[],
  remove: readonly string[],
  strand: readonly string[],
  sweeping: Sweeping,
  done: string[]
): Answer {
  const held = sweeping(home, { write: new Map(), enable: [], stop: [], remove, strand }, done)
  const said = [...report, ...held.did.map((what) => `did\t${what}`)]
  if (held.refused.length > 0) return answeredWith(said, held.refused, OPERATIONAL)
  return told(said)
}

export function sweptBy(
  home: string,
  report: readonly string[],
  remove: readonly string[],
  strand: readonly string[],
  sweeping: Sweeping
): Promise<Answer> {
  return answering((done) => naming(done, sweptEach(home, report, remove, strand, sweeping, done)))
}

export async function infrastructureServiceSweep(
  argv: readonly string[],
  given: Given,
  sweeping: Sweeping = sweptAway
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [dryRun])
  if ("refused" in read) return mistaking([...read.refused, EVERY_UNIT])

  const found = everyService(given.root)
  if ("refused" in found) return refused(found.refused, DATA)

  const home = homeAt()
  if (home === null) {
    return refused("no home directory is stated, so no unit has anywhere to sit", OPERATIONAL)
  }

  const owned = ourInstalled(home)
  const plan = planFor(found.services, owned)
  const remove = plan.remove
  const strand = strandedAmong(ourStaged(home), owned, plan)
  if (remove.length === 0 && strand.length === 0) {
    return told([ALL_ACCOUNTED])
  }

  const report = [
    ...remove.map((name) => `remove\t${name}`),
    ...strand.map((name) => `stranded\t${name}`),
  ]
  if (read.taken.dryRun) return told([...report, NOT_SWEPT])

  return await sweptBy(home, report, remove, strand, sweeping)
}
