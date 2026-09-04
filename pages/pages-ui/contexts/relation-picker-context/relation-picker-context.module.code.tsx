"use client"

import { usePageResolverOptional } from "@akasha/pages-ui/contexts/page-resolver-context"
import { createContext, useContext, useMemo } from "react"

export interface RelationPickerResult {
  pages: readonly { id: string; title: string }[]
  loadMore: () => void
  canLoadMore: boolean
  isLoading: boolean
}

export interface RelationPickerArgs {
  searchTerm?: string
  enabled?: boolean
}

type UseRelationPickerHook = (
  targetPageTypeId: string | undefined,
  args: RelationPickerArgs
) => RelationPickerResult

function useResolverFallback(
  targetPageTypeId: string | undefined,
  args: RelationPickerArgs
): RelationPickerResult {
  const resolver = usePageResolverOptional()
  const searchTerm = args.searchTerm ?? ""
  return useMemo<RelationPickerResult>(() => {
    if (!resolver) {
      return { pages: [], loadMore: () => {}, canLoadMore: false, isLoading: false }
    }
    const all = resolver.listPages(targetPageTypeId)
    const needle = searchTerm.toLowerCase()
    const filtered = needle !== "" ? all.filter((p) => p.title.toLowerCase().includes(needle)) : all
    return {
      pages: filtered,
      loadMore: () => {},
      canLoadMore: false,
      isLoading: false,
    }
  }, [resolver, targetPageTypeId, searchTerm])
}

const RelationPickerContext = createContext<UseRelationPickerHook>(useResolverFallback)

export function useRelationPicker(
  targetPageTypeId: string | undefined,
  args: RelationPickerArgs
): RelationPickerResult {
  const useImpl = useContext(RelationPickerContext)
  return useImpl(targetPageTypeId, args)
}

export function RelationPickerProvider({
  useImpl,
  children,
}: {
  useImpl: UseRelationPickerHook
  children: React.ReactNode
}) {
  return <RelationPickerContext.Provider value={useImpl}>{children}</RelationPickerContext.Provider>
}
