import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { workstationService } from "akasha/commands/arguments/pages/workstation-service.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { infrastructureServiceRestart as page } from "akasha/commands/pages/infrastructure/service/restart/infrastructure-service-restart.command.ts"
import { asked } from "akasha/commands/pages/infrastructure/service/service-unit-asking/service-unit-asking.module.code.ts"

const AFRESH = "restart"

export function infrastructureServiceRestart(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRun, workstationService])
  if ("refused" in read) return mistaking(read.refused)
  return asked(AFRESH, read.taken, given)
}
