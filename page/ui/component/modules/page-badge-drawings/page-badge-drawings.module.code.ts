import {
  drawingsIn,
  firstDrawing,
} from "akasha/page/ui/component/modules/drawings-found/drawings-found.module.code.ts"
import type { PageBadgeProps } from "akasha/page/ui/component/modules/page-badge/page-badge.module.code.tsx"
import type { ComponentType } from "react"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

type Drawn = { readonly Drawing: ComponentType<PageBadgeProps> }

const ENDING = ".page-badge-component.code.tsx"

const FOUND = import.meta.glob<Drawn>("../../../../../**/*.page-badge-component.code.tsx", {
  eager: true,
})

export const PAGE_BADGE_DRAWINGS: ReadonlyMap<string, ComponentType<PageBadgeProps>> = drawingsIn(
  FOUND,
  ENDING
)

export function drawingAlong(
  drawnBy: readonly string[] | undefined
): ComponentType<PageBadgeProps> | undefined {
  return firstDrawing(PAGE_BADGE_DRAWINGS, drawnBy)
}
