import { buildEffect } from "@akasha/temper-combat-addon/combat-action-effect"
import { LEVEL_CRUX } from "@akasha/temper-combat-addon/combat-action-levels"
import type { Ability, Effect } from "@akasha/temper-combat-addon/combat-action-types"

interface CruxState {
  stacks: number
  startTime: number
  endTime: number
}

let STATE: CruxState = { stacks: 0, startTime: 0, endTime: 0 }

export function setCruxStacks(stacks: number, now: number, endTime: number): undefined {
  if (stacks <= 0) {
    STATE = { stacks: 0, startTime: now, endTime: 0 }
    return undefined
  }
  STATE = { stacks, startTime: now, endTime }
  return undefined
}

export function getCruxEffect(ability: Ability): Effect | undefined {
  if (STATE.stacks <= 0) {
    return undefined
  }
  const effect = buildEffect({
    ability,
    unitTag: "player",
    unitId: 0,
    startTime: STATE.startTime,
    endTime: STATE.endTime,
    stackCount: STATE.stacks,
  })
  effect.level = LEVEL_CRUX
  effect.levelIsLow = true
  effect.isCrux = true
  return effect
}

export function clearCrux(): undefined {
  STATE = { stacks: 0, startTime: 0, endTime: 0 }
  return undefined
}

export function getCruxStacks(): number {
  return STATE.stacks
}

export function isCruxConsumerIcon(icon: string): boolean {
  return icon.includes("arcanist_002") || icon.includes("arcanist_003_b")
}
