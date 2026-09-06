import type { Shadow } from "../../../pages/shadow/shadow.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import type { World } from "../change-shadow/change-shadow.module.code.ts"

export type Guarding = {
  readonly said: Answer
  readonly shadow: Shadow
  readonly before: World
}

export type Guard = (given: Guarding) => string | null
