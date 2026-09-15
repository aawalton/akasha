import {
  drawingsIn,
  firstDrawing,
} from "akasha/page/ui/components/modules/drawings-found/drawings-found.module.code.ts"
import type { PageRowCellsProps } from "akasha/page/ui/components/modules/page-row-cells/page-row-cells.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PageRowCellsProps> }

const ENDING = ".page-row-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.page-row-component.code.tsx", {
  eager: true,
})

export const PAGE_ROW_DRAWINGS: ReadonlyMap<string, ComponentType<PageRowCellsProps>> = drawingsIn(
  FOUND,
  ENDING
)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PageRowCellsProps> | undefined {
  return firstDrawing(PAGE_ROW_DRAWINGS, drawnBy)
}
