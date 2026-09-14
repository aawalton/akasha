import {
  drawingsIn,
  firstDrawing,
} from "akasha/pages/ui/components/modules/drawings-found/drawings-found.module.code.ts"
import type { PropertyBadgeProps } from "akasha/pages/ui/components/modules/property-badge/property-badge.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PropertyBadgeProps> }

const ENDING = ".property-badge-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.property-badge-component.code.tsx", {
  eager: true,
})

export const PROPERTY_BADGE_DRAWINGS: ReadonlyMap<
  string,
  ComponentType<PropertyBadgeProps>
> = drawingsIn(FOUND, ENDING)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PropertyBadgeProps> | undefined {
  return firstDrawing(PROPERTY_BADGE_DRAWINGS, drawnBy)
}
