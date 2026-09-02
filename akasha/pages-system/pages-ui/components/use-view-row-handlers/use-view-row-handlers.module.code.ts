import { createPage } from "@akasha/pages-access/create"
import { deletePage } from "@akasha/pages-access/delete"
import { patchPropertyDefinitionById } from "@akasha/pages-access/property-definition"
import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useHostCreateSelectOption } from "@akasha/pages-ui/option-create-context"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticDeletePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-delete-page"
import { useOptimisticPatchPropertyDefinition } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-property-definition"
import type { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { createOptionOnDefinition } from "@akasha/pages-ui-components/create-option"
import { buildPageHref } from "@akasha/pages-url/page-href"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useCallback } from "react"

interface UseViewRowHandlersArgs {
  rowPageTypeSlug?: PageTypeSlug
  resolveRowSlug?: (pageId: string) => PageTypeSlug | undefined
  effectivePageTypeId?: string
  userId?: string | null
  properties: readonly PropertyDefinition[]
  setProperty: ReturnType<typeof useSetPropertyOptimistic>
}

export function useViewRowHandlers({
  rowPageTypeSlug,
  resolveRowSlug,
  effectivePageTypeId,
  userId,
  properties,
  setProperty,
}: UseViewRowHandlersArgs) {
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
  const patchDefinition = useOptimisticPatchPropertyDefinition((args) =>
    patchPropertyDefinitionById(args)
  )
  const hostCreateOption = useHostCreateSelectOption()
  const router = usePagesUIRouter()

  const handleCreatePage = useCallback(
    async (seed?: Record<string, string | number | boolean | null>) => {
      if (effectivePageTypeId == null || userId == null || rowPageTypeSlug == null) return
      const createProps: Record<string, Json> = { userId, ...seed }
      const row = await runCreate({ pageTypeSlug: rowPageTypeSlug, properties: createProps })
      const newId = typeof row.id === "string" ? row.id : undefined
      if (newId != null) {
        router.push(
          buildPageHref({
            pageTypeSlug: rowPageTypeSlug,
            slug: null,
            fallbackSlugSource: null,
            id: newId,
          })
        )
      }
    },
    [runCreate, effectivePageTypeId, rowPageTypeSlug, userId, router]
  )

  const handleIconChange = useCallback(
    (pageId: string, icon: IconName) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      setProperty({ pageTypeSlug: slug, pageId, propertyId: "icon", value: icon })
    },
    [setProperty, rowPageTypeSlug, resolveRowSlug]
  )

  const handleDeletePage = useCallback(
    (pageId: string) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      void runDelete({ pageTypeSlug: slug, where: [{ key: "id", eq: pageId }] })
    },
    [runDelete, rowPageTypeSlug, resolveRowSlug]
  )

  const handleToggleFavorite = useCallback(
    (pageId: string, value: number | null) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      setProperty({ pageTypeSlug: slug, pageId, propertyId: "favoritedAt", value })
    },
    [setProperty, rowPageTypeSlug, resolveRowSlug]
  )

  const handleCreateOption = useCallback(
    (pageId: string, pageData: PageDataJSON, propertyId: string, label: string) => {
      if (rowPageTypeSlug == null) return
      return createOptionOnDefinition({
        patch: patchDefinition,
        createOption: hostCreateOption ?? undefined,
        properties,
        rowPageTypeSlug,
        setProperty,
        pageId,
        pageData,
        propertyId,
        label,
      })
    },
    [patchDefinition, hostCreateOption, properties, setProperty, rowPageTypeSlug]
  )

  return {
    handleCreatePage,
    handleIconChange,
    handleDeletePage,
    handleToggleFavorite,
    handleCreateOption,
  }
}
