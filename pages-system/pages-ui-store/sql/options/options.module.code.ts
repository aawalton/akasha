import type { PageOrder, PageSelect } from "@akasha/pages-access/types"
import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import type { ShapeDescriptor } from "../../collection/shape-descriptor/shape-descriptor.module.code.ts"

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
