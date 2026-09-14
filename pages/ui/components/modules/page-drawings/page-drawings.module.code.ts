import {
  drawingsIn,
  firstDrawing,
} from "akasha/pages/ui/components/modules/drawings-found/drawings-found.module.code.ts"
import type { PageDrawingProps } from "akasha/pages/ui/components/modules/page-detail-content/page-detail-content.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PageDrawingProps> }

const ENDING = ".page-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.page-component.code.tsx", {
  eager: true,
})

const PAGE_DRAWINGS: ReadonlyMap<string, ComponentType<PageDrawingProps>> = drawingsIn(
  FOUND,
  ENDING
)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PageDrawingProps> | undefined {
  return firstDrawing(PAGE_DRAWINGS, drawnBy)
}
