import type { MeasuredBy } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/properties/measured-by.text-property.types.ts"
import type { NeverMoves } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/properties/never-moves.boolean-property.types.ts"
import type { PanelDock } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/properties/panel-dock.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperHudPanel = TemperThing & {
  key: Key
  dock: PanelDock
  displayOrder: DisplayOrder
  neverMoves?: NeverMoves
  measuredBy?: MeasuredBy
}
