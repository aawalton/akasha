import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { workstationService } from "akasha/command/argument/pages/workstation-service.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { allowedThrough } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { infrastructureServiceRun as page } from "akasha/command/pages/infrastructure/service/run/infrastructure-service-run.command.ts"
import {
  runningNow,
  stateFor,
  type UnitState,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-health/service-health.module.code.ts"
import { reachedFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-running/service-running.module.code.ts"
import { SERVICE_SUFFIX } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"

export type Running = (done: string[]) => void | Promise<void>

export type Calling = (done: string[], slug: string, running: Running) => Promise<Answer>

async function called(done: string[], slug: string, running: Running): Promise<Answer> {
  allowedThrough()
  await running(done)
  return told([...done, `ran\t${slug}`])
}

export async function calledBy(
  slug: string,
  running: Running,
  calling: Calling = called
): Promise<Answer> {
  return await answering(async (done) => await calling(done, slug, running))
}

export type Stating = (unit: string) => UnitState | undefined

function besideIt(unit: string, slug: string): string {
  return (
    `${unit} is already running, and a run beside it takes the installed one down` +
    ` — stop it with \`akasha infrastructure service stop ${slug}\` first,` +
    ` or watch it with \`journalctl --user -u ${unit} -f\``
  )
}

export function alreadyUp(slug: string, stating: Stating): Answer | null {
  const unit = `${slug}${SERVICE_SUFFIX}`
  if (!runningNow(stating(unit))) return null
  return refused(besideIt(unit, slug), OPERATIONAL)
}

export async function infrastructureServiceRun(
  argv: readonly string[],
  given: Given,
  stating: Stating = stateFor
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [workstationService])
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.workstationService

  const reached = await reachedFor(given.root, slug)
  if ("unnamed" in reached) return refused(reached.unnamed, INPUT)
  if ("refused" in reached) return refused(reached.refused, DATA)

  const up = alreadyUp(slug, stating)
  if (up !== null) return up

  return await calledBy(slug, reached.running)
}
