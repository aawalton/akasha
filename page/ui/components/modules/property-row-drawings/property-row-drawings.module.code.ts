import {
  drawingsIn,
  firstDrawing,
} from "akasha/page/ui/components/modules/drawings-found/drawings-found.module.code.ts"
import type { PropertyRowProps } from "akasha/page/ui/components/modules/property-row/property-row.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PropertyRowProps> }

const ENDING = ".property-row-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.property-row-component.code.tsx", {
  eager: true,
})

export const PROPERTY_ROW_DRAWINGS: ReadonlyMap<
  string,
  ComponentType<PropertyRowProps>
> = drawingsIn(FOUND, ENDING)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PropertyRowProps> | undefined {
  return firstDrawing(PROPERTY_ROW_DRAWINGS, drawnBy)
}
