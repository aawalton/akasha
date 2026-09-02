"use client"

import { resolveDescendantPageTypeIds } from "@akasha/pages-core/schema/page-type-inheritance"
import {
  PageResolverProvider,
  type PageResolverValue,
} from "@akasha/pages-ui/contexts/page-resolver-context"
import {
  type RelationPickerArgs,
  RelationPickerProvider,
  type RelationPickerResult,
} from "@akasha/pages-ui/contexts/relation-picker-context"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { usePaginatedRelationPicker } from "@akasha/pages-ui/supabase/relation-picker"
import { buildPageResolver } from "@akasha/pages-ui-components/view-engine/build-page-resolver"
import { createContext, useCallback, useContext, useMemo } from "react"

interface SupabasePageResolverProviderProps {
  pages: readonly PageWithProperties[]
  pageTypes: readonly PageWithProperties[]
  relatedPages?: readonly PageWithProperties[]
  pickerPageTypeSlug?: string
  children: React.ReactNode
}

interface PickerEnv {
  pageTypeSlug: string
  getDescendantSet: (targetId: string) => Set<string>
}
const PickerEnvContext = createContext<PickerEnv | null>(null)

function useSupabaseRelationPicker(
  targetPageTypeId: string | undefined,
  args: RelationPickerArgs
): RelationPickerResult {
  const env = useContext(PickerEnvContext)

  const pageTypeIds = useMemo(() => {
    if (!env || targetPageTypeId == null) return undefined
    return Array.from(env.getDescendantSet(targetPageTypeId))
  }, [env, targetPageTypeId])

  const result = usePaginatedRelationPicker({
    pageTypeSlug: env?.pageTypeSlug ?? "",
    pageTypeIds,
    searchTerm: args.searchTerm,
    enabled: (args.enabled ?? true) && env != null,
  })

  return useMemo<RelationPickerResult>(
    () => ({
      pages: result.pages.map((p) => ({
        id: p._id,
        title: String(p.properties?.title ?? p._id),
      })),
      loadMore: result.loadMore,
      canLoadMore: result.canLoadMore,
      isLoading: result.isLoading,
    }),
    [result.pages, result.loadMore, result.canLoadMore, result.isLoading]
  )
}

export function SupabasePageResolverProvider({
  pages,
  pageTypes,
  relatedPages,
  pickerPageTypeSlug,
  children,
}: SupabasePageResolverProviderProps) {
  const getDescendantSet = useMemo(() => {
    const cache = new Map<string, Set<string>>()
    return (targetId: string): Set<string> => {
      const cached = cache.get(targetId)
      if (cached) return cached
      const set = resolveDescendantPageTypeIds(pageTypes, targetId)
      cache.set(targetId, set)
      return set
    }
  }, [pageTypes])

  const resolver = useMemo(
    (): PageResolverValue =>
      buildPageResolver([pageTypes, pages, relatedPages ?? []], { getDescendantSet }),
    [pages, pageTypes, relatedPages, getDescendantSet]
  )

  const pickerEnv = useMemo<PickerEnv | null>(
    () =>
      pickerPageTypeSlug != null ? { pageTypeSlug: pickerPageTypeSlug, getDescendantSet } : null,
    [pickerPageTypeSlug, getDescendantSet]
  )

  const usePickerImpl = useCallback(useSupabaseRelationPicker, [])

  const wrapped = pickerEnv ? (
    <PickerEnvContext.Provider value={pickerEnv}>
      <RelationPickerProvider useImpl={usePickerImpl}>{children}</RelationPickerProvider>
    </PickerEnvContext.Provider>
  ) : (
    children
  )

  return <PageResolverProvider value={resolver}>{wrapped}</PageResolverProvider>
}
