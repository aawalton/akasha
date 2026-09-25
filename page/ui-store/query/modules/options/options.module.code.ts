import type { PageOrder, PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type {
  PageCondition,
  PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

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
