import { getReorderVerb } from "@akasha/pages-ui/reorder-verbs/reorder-verb-registry"
import { useMemo } from "react"

export interface ReorderCardsChange {
  readonly orderedIds: readonly string[]
  readonly fromIndex: number
  readonly toIndex: number
}

export type ReorderCardsHandler = (change: ReorderCardsChange) => void

interface DeriveReorderCardsHandlerArgs {
  reorder: { verbId: string } | undefined
  viewId?: string
  pageTypeSlug: string
}

export function deriveReorderCardsHandler({
  reorder,
  viewId,
  pageTypeSlug,
}: DeriveReorderCardsHandlerArgs): ReorderCardsHandler | undefined {
  if (reorder === undefined) return undefined
  const { verbId } = reorder
  return ({ orderedIds, fromIndex, toIndex }) => {
    void getReorderVerb(verbId)?.({ orderedIds, fromIndex, toIndex, viewId, pageTypeSlug })
  }
}

export function useReorderViewWiring({
  reorder,
  viewId,
  pageTypeSlug,
}: DeriveReorderCardsHandlerArgs): { onReorderCards: ReorderCardsHandler | undefined } {
  const verbId = reorder?.verbId
  const onReorderCards = useMemo(
    () =>
      deriveReorderCardsHandler({
        reorder: verbId != null ? { verbId } : undefined,
        viewId,
        pageTypeSlug,
      }),
    [verbId, viewId, pageTypeSlug]
  )
  return { onReorderCards }
}
