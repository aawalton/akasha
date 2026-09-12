import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { workstationService } from "akasha/commands/arguments/pages/workstation-service.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { asked } from "akasha/commands/pages/infrastructure/service/service-unit-asking/service-unit-asking.module.code.ts"
import { infrastructureServiceStop as page } from "akasha/commands/pages/infrastructure/service/stop/infrastructure-service-stop.command.ts"

const ENDS = "stop"

export function infrastructureServiceStop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRun, workstationService])
  if ("refused" in read) return mistaking(read.refused)
  return asked(ENDS, read.taken, given)
}
