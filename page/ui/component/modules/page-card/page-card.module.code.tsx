"use client"

import type { IconName } from "akasha/page/core/generated/modules/icon-search-index/icon-search-index.module.code.ts"
import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { CompletionShape } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import {
  type PageTypeForInheritance,
  pageTypeChain,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import type { GalleryCardSize } from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import {
  drawingAlong,
  PAGE_CARD_DRAWINGS,
} from "akasha/page/ui/component/modules/page-card-drawings/page-card-drawings.module.code.ts"
import { PAGE_TYPE_SLUG } from "akasha/page/ui/component/modules/page-detail-content-helpers/page-detail-content-helpers.module.code.ts"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import type * as React from "react"
import type { ComponentType, ReactNode } from "react"

const FALLS_BACK_TO = "page"

export interface PageCardProps extends Omit<React.ComponentProps<"div">, "title" | "id"> {
  id: string
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  pageTypeSlug?: string
  visiblePropertyIds?: readonly string[]
  alwaysShowPropertyIds?: readonly string[]
  onIconChange?: (icon: IconName) => void
  defaultIconName?: string | null
  onPropertyChange?: (propertyId: string, value: unknown, eventTimeStamp?: number) => void
  onPageNavigate?: (pageId: string) => void
  onRelationNavigate?: (propertyId: string) => void
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onCardNavigate?: (pageId: string) => void
  completion?: CompletionShape | null
  onComplete?: (value: number | null) => void
  href?: string
  onDelete?: () => void
  onToggleFavorite?: (value: number | null) => void
  coverSize?: GalleryCardSize
  coverUrl?: string | null
  coverMaskGlyph?: string | null
  onCoverClick?: () => void
  notesSlot?: ReactNode
}

export function PageCard(props: PageCardProps) {
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const known: ReadonlyArray<PageTypeForInheritance> = pageTypes
  const slug = props.pageTypeSlug
  const drawn =
    slug === undefined || slug === "" ? undefined : drawingAlong(pageTypeChain(known, slug))
  const Component: ComponentType<PageCardProps> | undefined =
    drawn ?? PAGE_CARD_DRAWINGS.get(FALLS_BACK_TO)
  if (Component === undefined) return null
  return <Component {...props} />
}
