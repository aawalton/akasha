"use client"

import { PageTitleBadges } from "@akasha/design-layout/page-layout"
import { useLayoutSearchParams } from "@akasha/design-layout/router-context"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { parseNavConfig } from "@akasha/pages-core/schema/nav-config"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { resolveDefinitionOptions } from "@akasha/pages-core/schema/resolve-select-options"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { LockedFacet } from "@akasha/pages-core/schema/view-data-locked"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { PagesUILink } from "@akasha/pages-ui/navigation-context"
import { useAllPages, usePageByIdSuffix, useViewsForNavItem } from "@akasha/pages-ui/supabase/hooks"
import { useOptionListLookup } from "@akasha/pages-ui/supabase/use-option-list-lookup"
import { usePageTypeDirectory } from "@akasha/pages-ui/supabase/use-page-type-directory"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { useSupabaseViewCallbacks } from "@akasha/pages-ui/supabase/use-view-callbacks"
import { viewDataOfPage } from "@akasha/pages-ui/supabase/view-data-of-page"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { toPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import type { PageTypeOption } from "@akasha/pages-ui-components/view-settings-options"
import type { ViewTabItem } from "@akasha/pages-ui-components/view-tab-context-menu"
import { parsePageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { ArrowLeft } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { EditableTitle } from "../editable-title/editable-title.module.code.tsx"
import { PageSystemShell } from "../page-system-shell/page-system-shell.module.code.tsx"
import { PageTitleProperties } from "../page-title-properties/page-title-properties.module.code.tsx"
import { ViewTabContent } from "../view-tab-content/view-tab-content.module.code.tsx"

const SYSTEM_PAGE_TYPE_NAMES = new Set(["View", "Page Type", "Nav"])

const PAGE_TYPE_SLUG = "page-type"
const NAV_SLUG = toPageTypeSlug("nav")

interface ViewPageContentProps {
  navItemIdParam: string
}

export function ViewPageContent({ navItemIdParam }: ViewPageContentProps) {
  const { pages: pageTypes, isLoading: pageTypesLoading } = useAllPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
  })

  const lookupOptionList = useOptionListLookup()

  const idSuffix = useMemo(() => parsePageHrefParam(navItemIdParam)?.idSuffix, [navItemIdParam])
  const { page: navItemPage, isLoading: navItemLoading } = usePageByIdSuffix({
    pageTypeSlug: NAV_SLUG,
    idSuffix,
  })
  const navItemId = typeof navItemPage?._id === "string" ? navItemPage._id : undefined
  const navItemSlug =
    typeof navItemPage?.properties.slug === "string" ? navItemPage.properties.slug : undefined
  const parentLocked: LockedFacet | undefined = useMemo(
    () => parseNavConfig(navItemPage?.properties.config)?.locked,
    [navItemPage]
  )

  const { views: viewPages, isLoading: viewsLoading } = useViewsForNavItem({
    navItemId,
    navItemSlug,
  })

  const fromFiles = usePageTypeDirectory()
  const pageTypeIdBySlug = useMemo(() => {
    const map = new Map<string, string>()
    for (const pt of pageTypes) {
      const slug = pt.properties?.slug
      if (typeof slug === "string" && slug !== "") map.set(slug, pt._id)
    }
    return (slug: string): string | undefined => map.get(slug) ?? fromFiles(slug)
  }, [pageTypes, fromFiles])

  const pageTypeIconById = useMemo(() => {
    const map = new Map<string, string>()
    for (const pt of pageTypes) {
      if (typeof pt.properties?.icon === "string") map.set(pt._id, pt.properties.icon)
    }
    return map
  }, [pageTypes])

  const viewTabItems: ViewTabItem[] = useMemo(
    () =>
      viewPages.map((v) => {
        const pageTypeId = viewDataOfPage(v.properties, pageTypeIdBySlug)?.pageTypeId
        return {
          id: v._id,
          name: String(v.properties.title ?? ""),
          iconName: pageTypeId != null ? (pageTypeIconById.get(pageTypeId) ?? null) : null,
        }
      }),
    [viewPages, pageTypeIconById, pageTypeIdBySlug]
  )

  const urlTab = useLayoutSearchParams().get("tab") ?? undefined
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined)
  const currentTab = activeTab ?? urlTab ?? viewTabItems[0]?.id

  const userId = useUserId()
  const viewCallbacks = useSupabaseViewCallbacks({
    userId: userId ?? "",
    ownerNavItemId: navItemId ?? "",
    views: viewPages,
  })

  const setProperty = useSetPropertyOptimistic()

  useEffect(() => {
    if (
      activeTab != null &&
      viewTabItems.length > 0 &&
      !viewTabItems.find((v) => v.id === activeTab)
    ) {
      setActiveTab(viewTabItems[0]?.id)
    }
  }, [activeTab, viewTabItems])

  const activeViewConfig: ViewDataJSON | undefined = useMemo(() => {
    if (currentTab == null) return undefined
    const view = viewPages.find((v) => v._id === currentTab)
    return viewDataOfPage(view?.properties, pageTypeIdBySlug)
  }, [currentTab, viewPages, pageTypeIdBySlug])

  const titleAlignEnd = activeViewConfig?.title_properties_align === "end"

  const pageTypeOptions: PageTypeOption[] = useMemo(
    () =>
      pageTypes
        .filter((pt) => {
          const name = String(pt.properties?.title ?? "")
          return !SYSTEM_PAGE_TYPE_NAMES.has(name)
        })
        .map((pt) => ({
          id: pt._id,
          name: String(pt.properties?.title ?? ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [pageTypes, userId]
  )

  const navTypeDefinitions = useMemo<readonly PropertyDefinition[]>(() => {
    const navTypeId =
      typeof navItemPage?.properties.pageTypeId === "string"
        ? navItemPage.properties.pageTypeId
        : undefined
    if (navTypeId == null) return []
    const navType = pageTypes.find((pt) => pt._id === navTypeId)
    if (navType == null) return []
    return parsePageTypeData(navType.properties).propertyDefinitions.map((d) =>
      resolveDefinitionOptions(d, lookupOptionList)
    )
  }, [pageTypes, navItemPage, lookupOptionList])

  const navData = useMemo(() => toPageDataJSON(navItemPage?.properties), [navItemPage])

  const pageName = String(navItemPage?.properties?.title ?? "View")

  const backHref =
    typeof navItemPage?.properties?.backHref === "string"
      ? navItemPage.properties.backHref
      : undefined

  const handleRename = useCallback(
    (newName: string) => {
      if (navItemId == null) return
      setProperty({
        pageTypeSlug: NAV_SLUG,
        pageId: navItemId,
        propertyId: "title",
        value: newName,
      })
    },
    [navItemId, setProperty]
  )

  const loading = pageTypesLoading || viewsLoading || navItemLoading
  const currentTabName = viewTabItems.find((v) => v.id === currentTab)?.name

  return (
    <div>
      {!loading && (
        <title>{currentTabName != null ? `${pageName} | ${currentTabName}` : pageName}</title>
      )}
      <PageSystemShell
        title={
          loading ? (
            ""
          ) : (
            <span
              className={
                titleAlignEnd ? "flex w-full items-center gap-2" : "inline-flex items-center gap-2"
              }
            >
              {backHref !== undefined && (
                <PagesUILink
                  href={backHref}
                  className="inline-flex items-center justify-center rounded-md p-1 text-primary hover:text-primary"
                >
                  <ArrowLeft className="size-5" aria-hidden />
                  <span className="sr-only">Back</span>
                </PagesUILink>
              )}
              <EditableTitle value={pageName} onSave={handleRename} />
              {}
              {activeViewConfig?.title_properties != null &&
                activeViewConfig.title_properties.length > 0 && (
                  <PageTitleBadges className={titleAlignEnd ? "ml-auto" : undefined}>
                    <PageTitleProperties
                      pageId={navItemId}
                      pageTypeSlug={NAV_SLUG}
                      data={navData}
                      definitions={navTypeDefinitions}
                      titlePropertyIds={activeViewConfig.title_properties}
                    />
                  </PageTitleBadges>
                )}
            </span>
          )
        }
        tabs={[]}
        loading={loading}
        views={viewTabItems}
        viewCallbacks={viewCallbacks}
        currentViewData={activeViewConfig}
        activeTab={currentTab}
        onActiveTabChange={setActiveTab}
        syncUrl
        storagePrefix={`view-${navItemIdParam}`}
        empty={{
          title: "No views",
          description: "Create a view to get started.",
        }}
      >
        {viewTabItems.map((viewTab) => (
          <TabsContent key={viewTab.id} value={viewTab.id}>
            <ViewTabContent
              parentPageTypeId={navItemId ?? ""}
              parentLocked={parentLocked}
              viewId={viewTab.id}
              viewPages={viewPages}
              pageTypes={pageTypes}
              onUpdateView={viewCallbacks.onUpdateView}
              pageTypeOptions={pageTypeOptions}
            />
          </TabsContent>
        ))}
      </PageSystemShell>
    </div>
  )
}
