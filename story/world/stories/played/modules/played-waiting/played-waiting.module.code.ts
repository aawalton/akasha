import {
  BEATS,
  GAME_MASTER,
  stepIn,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const STATUS = "stepStatus"

const ROLEPLAYED = "roleplayed"

const AHEAD: readonly (TurnStep | null)[] = [BEATS, WORLD_BUILDER, GAME_MASTER]

export const WAITING_SAID = "Waits for the turn before to finish…"

type Row = Readonly<Record<string, unknown>>

export function waitsOn(last: Row, before: Row | undefined): boolean {
  if (before === undefined || last[ROLEPLAYED] === true) return false
  return stepIn(last[STATUS]) === WORLD_BUILDER && AHEAD.includes(stepIn(before[STATUS]))
}
