import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { asked } from "akasha/commands/pages/infrastructure/service/service-unit-asking/service-unit-asking.module.code.ts"

const TOLD = "start"

export function infrastructureServiceStart(argv: readonly string[], given: Given): Answer {
  return asked(TOLD, argv, given)
}
