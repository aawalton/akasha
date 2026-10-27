import { doneBy } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import { beatsIn } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { roleplayed } from "akasha/story/world/stories/played/properties/roleplayed.boolean-property.ts"
import {
  BEATS,
  GAME_MASTER,
  stepIn,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

type Row = Readonly<Record<string, unknown>>

const STATUS = "stepStatus"

const BEATS_FILE = "beats"

const AHEAD: readonly (TurnStep | null)[] = [WORLD_BUILDER, GAME_MASTER]

function rememberedIn(body: unknown): boolean {
  if (typeof body !== "string") return false
  const read = beatsIn(body)
  return !("refused" in read) && doneBy(read, "memory")
}

export function holdsBack(row: Row | undefined): boolean {
  if (row === undefined || row[roleplayed.propertySlug] === true) return false
  const status = stepIn(row[STATUS])
  return status === BEATS ? !rememberedIn(row[BEATS_FILE]) : AHEAD.includes(status)
}
