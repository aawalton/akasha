import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { workstationService } from "akasha/command/argument/pages/workstation-service.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keyedLines,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { infrastructureServiceBundle as page } from "akasha/command/pages/infrastructure/service/bundle/infrastructure-service-bundle.command.ts"
import { bundledFor } from "akasha/infrastructure/service/workstation/modules/service-bundling/service-bundling.module.code.ts"
import { homeAt } from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"

const NO_HOME = "no home directory is stated, so the bundle has nowhere to be written"

const PLACES = 2

export async function infrastructureServiceBundle(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [workstationService])
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.workstationService

  const home = homeAt()
  if (home === null) return refused(NO_HOME, OPERATIONAL)

  return await answering(async () => {
    const made = await bundledFor(given.root, slug, home)
    if ("unnamed" in made) return refused(made.unnamed, INPUT)
    if ("refused" in made) return refused(made.refused, DATA)
    return told(
      keyedLines([
        ["at", made.built.at],
        ["bytes", made.built.bytes],
        ["seconds", made.built.seconds.toFixed(PLACES)],
      ])
    )
  })
}
