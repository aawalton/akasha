import type { PageOrder, PageSelect } from "@shared/pages-access/types"
import type { PageWhere } from "@shared/pages-core/page-types"
import type { PageCondition } from "@shared/pages-core/page-types"
import type { ShapeDescriptor } from "../collection/shape-descriptor"

export type UsePagesOptions = {
  pageTypeSlug: string
  where?: PageWhere
  order?: PageOrder
  select?: PageSelect
  limit?: number
}

export type UseViewQueryOptions = {
  pageTypeId: string
  pageTypeSlug?: string
  sorts?: PageOrder
  filters?: PageWhere
  resolveKeys?: readonly string[]
  limit?: number
  pageSize?: number
  viewId?: string
  viewUpdatedAt?: string
  crossType?: boolean
  crossTypeDescriptor?: ShapeDescriptor
  gatingTargetSlugs?: readonly string[]
  displayTargetSlugs?: readonly string[]
}

export type PageConditionLike = PageCondition
