import { NOT_WORKED_OUT } from "../../../pages/shadow/shadow.module.code.ts"
import { refusing } from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { shadowOver } from "../change-shadow/change-shadow.module.code.ts"
import type { Guard, Guarding } from "./change-guarding.module.types.ts"

export function guardedBy(root: string, said: Answer, guards: readonly Guard[]): Answer {
  if (said.refused !== null || guards.length === 0) return said
  const cast = shadowOver(root, said)
  if ("refused" in cast) return refusing(NOT_WORKED_OUT)
  const given: Guarding = { said, shadow: cast.shadow }
  for (const guard of guards) {
    const why = guard(given)
    if (why !== null) return refusing(why)
  }
  return said
}
