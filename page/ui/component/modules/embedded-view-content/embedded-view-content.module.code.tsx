"use client"

import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { PageSystemShell } from "akasha/page/ui/component/modules/page-system-shell/page-system-shell.module.code.tsx"
import { ViewTabContent } from "akasha/page/ui/component/modules/view-tab-content/view-tab-content.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import {
  useAllPages,
  useViewsEmbeddedBy,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { useSupabaseViewCallbacks } from "akasha/page/ui/supabase/modules/use-view-callbacks/use-view-callbacks.module.code.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

const PAGE_TYPE_SLUG = "page-type"

export function EmbeddedViewContent({
  pageTypeSlug,
  id,
  relation,
  framed,
}: {
  pageTypeSlug: PageTypeSlug
  id: string
  relation: string
  framed?: boolean
}) {
  const { page } = usePage({ pageTypeSlug, id })
  const slug = toPageDataJSON(page?.properties).slug
  const named = typeof slug === "string" && slug !== "" ? namedAs(pageTypeSlug, slug, null) : null
  const narrows = useMemo<readonly ViewFilter[] | null>(
    () => (named === null ? null : [{ propertyId: relation, operator: "equals", value: named }]),
    [named, relation]
  )

  const { pages: pageTypes, isLoading: pageTypesLoading } = useAllPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
  })
  const { views, isLoading: viewsLoading } = useViewsEmbeddedBy({ pageTypeSlug })
  const view = views[0]
  const listedTypeId = useMemo(() => {
    const listed = viewDataOfPage(view?.properties)?.pageTypeSlug
    return pageTypes.find((one) => one.properties?.slug === listed)?._id
  }, [view, pageTypes])

  const userId = useUserId()
  const viewCallbacks = useSupabaseViewCallbacks({
    userId: userId ?? "",
    ownerNavSlug: "",
    views,
  })

  const tabs = useMemo(
    () =>
      view === undefined
        ? []
        : [{ id: view._id, label: String(view.properties.title ?? ""), icon: undefined }],
    [view]
  )

  const loading = pageTypesLoading || viewsLoading
  if (narrows === null || (!loading && view === undefined)) return null

  return (
    <PageSystemShell
      title={null}
      tabs={tabs}
      loading={loading}
      framed={framed}
      storagePrefix={`embedded-view-${pageTypeSlug}`}
    >
      {view !== undefined && listedTypeId !== undefined && (
        <ViewTabContent
          parentPageTypeId={listedTypeId}
          viewId={view._id}
          viewPages={views}
          pageTypes={pageTypes}
          onUpdateView={viewCallbacks.onUpdateView}
          narrows={narrows}
        />
      )}
    </PageSystemShell>
  )
}
