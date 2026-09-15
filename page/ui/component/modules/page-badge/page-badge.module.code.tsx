"use client"

import type { BadgeVariant } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import {
  type PageTypeForInheritance,
  pageTypeChain,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import {
  drawingAlong,
  PAGE_BADGE_DRAWINGS,
} from "akasha/page/ui/component/modules/page-badge-drawings/page-badge-drawings.module.code.ts"
import { PAGE_TYPE_SLUG } from "akasha/page/ui/component/modules/page-detail-content-helpers/page-detail-content-helpers.module.code.ts"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import type { ComponentType, MouseEventHandler } from "react"

const FALLS_BACK_TO = "page"

export interface PageBadgeProps {
  pageId: string
  label: string
  variant: BadgeVariant
  pageTypeId?: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
}

function slugOf(
  pageTypes: ReadonlyArray<PageTypeForInheritance>,
  pageTypeId: string
): string | undefined {
  const slug = pageTypes.find((pt) => pt._id === pageTypeId)?.properties?.slug
  return typeof slug === "string" && slug !== "" ? slug : undefined
}

export function PageBadge(props: PageBadgeProps) {
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const slug = props.pageTypeId === undefined ? undefined : slugOf(pageTypes, props.pageTypeId)
  const drawn = slug === undefined ? undefined : drawingAlong(pageTypeChain(pageTypes, slug))
  const Component: ComponentType<PageBadgeProps> | undefined =
    drawn ?? PAGE_BADGE_DRAWINGS.get(FALLS_BACK_TO)
  if (Component === undefined) return null
  return <Component {...props} />
}
