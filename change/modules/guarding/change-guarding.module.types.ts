import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export type Guarding = {
  readonly said: Answer
  readonly shadow: Shadow
  readonly before: World
}

export type Guard = (given: Guarding) => string | null
