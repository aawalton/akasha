import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Drawn } from "akasha/story/ui/played-panel/properties/drawn.file-property.types.ts"
import type { DrawnIn } from "akasha/story/ui/played-panel/properties/drawn-in.relation-property.types.ts"
import type { PanelPosition } from "akasha/story/ui/played-panel/properties/panel-position.number-property.types.ts"

export type PlayedPanel = Module & {
  drawn?: Drawn
  place: DrawnIn
  position: PanelPosition
}
