import type { Shadow } from "../../../pages/shadow/shadow.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"

export type Guarding = {
  readonly said: Answer
  readonly shadow: Shadow
  readonly root: string
}

export type Guard = (given: Guarding) => string | null
