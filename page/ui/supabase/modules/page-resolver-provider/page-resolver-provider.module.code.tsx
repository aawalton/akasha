"use client"

import { resolveDescendantPageTypeIds } from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import { buildPageTypeSlugMaps } from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import { buildPageResolver } from "akasha/page/ui/component/view-engine/modules/build-page-resolver/build-page-resolver.module.code.ts"
import {
  PageResolverProvider,
  type PageResolverValue,
} from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"
import {
  type RelationPickerArgs,
  RelationPickerProvider,
  type RelationPickerResult,
} from "akasha/page/ui/context/modules/relation-picker-context/relation-picker-context.module.code.tsx"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  pickedSlugFor,
  titledFor,
  usePaginatedRelationPicker,
} from "akasha/page/ui/supabase/modules/relation-picker/relation-picker.module.code.ts"
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
  pageTypes: readonly PageWithProperties[]
  slugById: ReadonlyMap<string, string>
  getDescendantSet: (targetId: string) => Set<string>
}
const PickerEnvContext = createContext<PickerEnv | null>(null)

function useSupabaseRelationPicker(
  targetPageTypeId: string | undefined,
  args: RelationPickerArgs
): RelationPickerResult {
  const env = useContext(PickerEnvContext)

  const pageTypeSlug = env ? pickedSlugFor(env.slugById, targetPageTypeId, env.pageTypeSlug) : ""

  const titled = useMemo(() => {
    if (!env || targetPageTypeId == null) return false
    return titledFor(env.pageTypes, pageTypeSlug, env.getDescendantSet(targetPageTypeId))
  }, [env, targetPageTypeId, pageTypeSlug])

  const result = usePaginatedRelationPicker({
    pageTypeSlug,
    titled,
    searchTerm: args.searchTerm,
    enabled: (args.enabled ?? true) && env != null && targetPageTypeId != null,
  })

  return useMemo<RelationPickerResult>(
    () => ({
      pages: result.pages,
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

  const slugById = useMemo(() => buildPageTypeSlugMaps(pageTypes).slugById, [pageTypes])

  const pickerEnv = useMemo<PickerEnv | null>(
    () =>
      pickerPageTypeSlug != null
        ? { pageTypeSlug: pickerPageTypeSlug, pageTypes, slugById, getDescendantSet }
        : null,
    [pickerPageTypeSlug, pageTypes, slugById, getDescendantSet]
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
