import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"

type FlatViewResult = {
  pages: readonly PageWithProperties[]
  isLoading: boolean
  error?: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
}

type GroupedViewResult = {
  isLoading: boolean
  error?: Error | null
  totalCount: number | null
}

export type ViewQuerySelection = {
  pages: readonly PageWithProperties[]
  loadMore: (() => void) | undefined
  canLoadMore: boolean
  isLoading: boolean
  error: Error | null
  totalCount: number | null
}

export function selectViewQueryResult(args: {
  groupByPropertyId: string | undefined
  rowPageTypeSlug: PageTypeSlug | undefined
  crossType: boolean
  flatResult: FlatViewResult
  groupedResult: GroupedViewResult
}): ViewQuerySelection {
  const { groupByPropertyId, rowPageTypeSlug, crossType, flatResult, groupedResult } = args
  const hasRows = rowPageTypeSlug != null || crossType
  const useFlat = groupByPropertyId == null && hasRows
  const pages = useFlat ? flatResult.pages : []
  const loadMore = useFlat ? () => flatResult.loadMore() : undefined
  const canLoadMore = useFlat ? flatResult.hasMore : false
  const isLoading = !hasRows
    ? false
    : groupByPropertyId != null
      ? groupedResult.isLoading
      : flatResult.isLoading
  const error = !hasRows
    ? null
    : groupByPropertyId != null
      ? (groupedResult.error ?? null)
      : (flatResult.error ?? null)
  const totalCount = !hasRows
    ? null
    : groupByPropertyId != null
      ? groupedResult.totalCount
      : flatResult.totalCount
  return { pages, loadMore, canLoadMore, isLoading, error, totalCount }
}
