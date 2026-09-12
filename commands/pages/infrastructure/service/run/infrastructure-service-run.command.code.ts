import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { workstationService } from "akasha/commands/arguments/pages/workstation-service.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { allowedThrough } from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import { infrastructureServiceRun as page } from "akasha/commands/pages/infrastructure/service/run/infrastructure-service-run.command.ts"
import { reachedFor } from "akasha/infrastructure/services/workstations/service-running/service-running.module.code.ts"

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

export async function infrastructureServiceRun(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [workstationService])
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.workstationService

  const reached = await reachedFor(given.root, slug)
  if ("unnamed" in reached) return refused(reached.unnamed, INPUT)
  if ("refused" in reached) return refused(reached.refused, DATA)

  return await calledBy(slug, reached.running)
}
