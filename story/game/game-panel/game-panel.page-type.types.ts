import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Drawn } from "akasha/story/game/game-panel/properties/drawn.file-property.types.ts"
import type { DrawnIn } from "akasha/story/game/game-panel/properties/drawn-in.relation-property.types.ts"

export type GamePanel = Module & {
  drawn?: Drawn
  place: DrawnIn
}
