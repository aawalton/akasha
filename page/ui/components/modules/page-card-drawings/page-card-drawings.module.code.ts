import {
  drawingsIn,
  firstDrawing,
} from "akasha/page/ui/components/modules/drawings-found/drawings-found.module.code.ts"
import type { PageCardProps } from "akasha/page/ui/components/modules/page-card/page-card.module.code.tsx"
import type { ComponentType } from "react"

type Drawn = { readonly Drawing: ComponentType<PageCardProps> }

const ENDING = ".page-card-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.page-card-component.code.tsx", {
  eager: true,
})

export const PAGE_CARD_DRAWINGS: ReadonlyMap<string, ComponentType<PageCardProps>> = drawingsIn(
  FOUND,
  ENDING
)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PageCardProps> | undefined {
  return firstDrawing(PAGE_CARD_DRAWINGS, drawnBy)
}
