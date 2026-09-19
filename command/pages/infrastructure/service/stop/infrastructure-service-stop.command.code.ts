import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { workstationService } from "akasha/command/argument/pages/workstation-service.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { asked } from "akasha/command/pages/infrastructure/service/modules/service-unit-asking/service-unit-asking.module.code.ts"
import { infrastructureServiceStop as page } from "akasha/command/pages/infrastructure/service/stop/infrastructure-service-stop.command.ts"

const ENDS = "stop"

export function infrastructureServiceStop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [workstationService])
  if ("refused" in read) return mistaking(read.refused)
  return asked(ENDS, read.taken, given)
}
