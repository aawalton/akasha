import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export type Guarding = {
  readonly said: Answer
  readonly shadow: Shadow
  readonly before: World
}

export type Guard = (given: Guarding) => string | null
