import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/command/arguments/pages/dry-run.argument.ts"
import { workstationService } from "akasha/command/arguments/pages/workstation-service.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { asked } from "akasha/command/pages/infrastructure/service/modules/service-unit-asking/service-unit-asking.module.code.ts"
import { infrastructureServiceRestart as page } from "akasha/command/pages/infrastructure/service/restart/infrastructure-service-restart.command.ts"

const AFRESH = "restart"

export function infrastructureServiceRestart(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRun, workstationService])
  if ("refused" in read) return mistaking(read.refused)
  return asked(AFRESH, read.taken, given)
}
