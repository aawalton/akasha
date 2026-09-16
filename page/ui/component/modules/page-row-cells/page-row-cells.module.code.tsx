"use client"

import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { CompletionShape } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import {
  type PageTypeForInheritance,
  pageTypeChain,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import { PAGE_TYPE_SLUG } from "akasha/page/ui/component/modules/page-detail-content-helpers/page-detail-content-helpers.module.code.ts"
import {
  drawingAlong,
  PAGE_ROW_DRAWINGS,
} from "akasha/page/ui/component/modules/page-row-drawings/page-row-drawings.module.code.ts"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import type { ComponentType } from "react"

const FALLS_BACK_TO = "page"

export interface PageRowCellsProps {
  data: PageDataJSON
  definitions: readonly PropertyDefinition[]
  visibleProperties?: readonly string[]
  rowHref: string
  pageTypeSlug?: string
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onPropertyChange?: (propertyId: string, value: unknown, eventTimeStamp?: number) => void
  completion?: CompletionShape | null
  onComplete?: (value: number | null) => void
  isFavorite?: boolean
  onToggleFavorite?: (value: number | null) => void
  onDelete?: () => void
}

export function PageRowCells(props: PageRowCellsProps) {
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const known: ReadonlyArray<PageTypeForInheritance> = pageTypes
  const slug = props.pageTypeSlug
  const drawn =
    slug === undefined || slug === "" ? undefined : drawingAlong(pageTypeChain(known, slug))
  const Component: ComponentType<PageRowCellsProps> | undefined =
    drawn ?? PAGE_ROW_DRAWINGS.get(FALLS_BACK_TO)
  if (Component === undefined) return null
  return <Component {...props} />
}
