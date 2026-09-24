import { heldIntent } from "akasha/story/game/mechanic/modules/action-intent/action-intent.module.code.ts"
import type { Rolled } from "akasha/story/game/mechanic/modules/dice-reading/dice-reading.module.code.ts"

const LEAST_SHARE = 10
const WHOLE_SHARE = 40

export type Reading = {
  readonly intellect: number
  readonly roll: Rolled
}

export type Aimed = { readonly intent: number }

export function runMechanic(reading: Reading): Aimed {
  const aimed = (reading.intellect * (LEAST_SHARE + reading.roll.total)) / WHOLE_SHARE
  return { intent: heldIntent(Math.round(aimed)) }
}
