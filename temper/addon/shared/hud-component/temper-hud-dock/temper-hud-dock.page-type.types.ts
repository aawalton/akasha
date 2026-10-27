import type { DockGap } from "akasha/temper/addon/shared/hud-component/temper-hud-dock/properties/dock-gap.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperHudDock = TemperThing & {
  gap: DockGap
}
