"use client"

import { PageTitleBadges } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { useLayoutSearchParams } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { viewBack } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-back.web-phrase.ts"
import { viewPageEmpty } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-page-empty.web-phrase.ts"
import { viewPageEmptyTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-page-empty-title.web-phrase.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { parseNavConfig } from "akasha/page/core/schema/modules/nav-config/nav-config.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { LockedFacet } from "akasha/page/core/schema/modules/view-data-locked/view-data-locked.module.code.ts"
import { updateViewConfig } from "akasha/page/core/view-state/modules/reducers/reducers.module.code.ts"
import { useAppEditing } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { EditableTitle } from "akasha/page/ui/component/modules/editable-title/editable-title.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { PageSystemShell } from "akasha/page/ui/component/modules/page-system-shell/page-system-shell.module.code.tsx"
import { PageTitleProperties } from "akasha/page/ui/component/modules/page-title-properties/page-title-properties.module.code.tsx"
import type { PageTypeOption } from "akasha/page/ui/component/modules/view-settings-options/view-settings-options.module.code.ts"
import { ViewTabContent } from "akasha/page/ui/component/modules/view-tab-content/view-tab-content.module.code.tsx"
import type { ViewTabItem } from "akasha/page/ui/component/modules/view-tab-context-menu/view-tab-context-menu.module.code.tsx"
import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import {
  useAllPages,
  usePageByIdSuffix,
  useViewsForNavItem,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { usePageTypeDirectory } from "akasha/page/ui/supabase/modules/use-page-type-directory/use-page-type-directory.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useSupabaseViewCallbacks } from "akasha/page/ui/supabase/modules/use-view-callbacks/use-view-callbacks.module.code.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { ArrowLeft } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

const PAGE_TYPE_SLUG = "page-type"
const NAV_SLUG = toPageTypeSlug("nav")

const SYSTEM_PAGE_TYPES: ReadonlySet<string> = new Set(["view", PAGE_TYPE_SLUG, NAV_SLUG])

type Unsaved = ReadonlyMap<string, Readonly<Record<string, unknown>>>

const NOTHING_UNSAVED: Unsaved = new Map()

function withUnsaved(
  views: readonly PageWithProperties[],
  unsaved: Unsaved
): readonly PageWithProperties[] {
  if (unsaved.size === 0) return views
  return views.map((view) => {
    const held = unsaved.get(view._id)
    return held === undefined ? view : { ...view, properties: { ...view.properties, ...held } }
  })
}

function keptUnsaved(
  unsaved: Unsaved,
  views: readonly PageWithProperties[],
  id: string,
  updates: Partial<ViewDataJSON>
): Unsaved {
  const effects = updateViewConfig(views, { id, updates }, { newPageId: "", ownerNavSlug: "" })
  if (effects.length === 0) return unsaved
  const next = new Map(unsaved)
  for (const effect of effects) {
    if (effect.kind !== "bulkSetProperties") continue
    const held: Record<string, unknown> = { ...next.get(effect.pageId) }
    for (const write of effect.properties) held[write.propertyId] = write.value
    next.set(effect.pageId, held)
  }
  return next
}

function nameOf(properties: Readonly<Record<string, unknown>> | undefined): string {
  const title = properties?.title
  if (typeof title === "string" && title !== "") return title
  return typeof properties?.slug === "string" ? properties.slug : ""
}

interface ViewPageContentProps {
  navItemIdParam: string
}

export function ViewPageContent({ navItemIdParam }: ViewPageContentProps) {
  const editing = useAppEditing()
  const { pages: pageTypes, isLoading: pageTypesLoading } = useAllPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
  })

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

  const { views: savedViews, isLoading: viewsLoading } = useViewsForNavItem({ navItemSlug })
  const [unsaved, setUnsaved] = useState<Unsaved>(NOTHING_UNSAVED)
  const viewPages = useMemo(() => withUnsaved(savedViews, unsaved), [savedViews, unsaved])

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
    ownerNavSlug: navItemSlug ?? "",
    views: savedViews,
  })

  const keepUnsaved = useCallback(
    (id: string, updates: Partial<ViewDataJSON>) => {
      setUnsaved((held) => keptUnsaved(held, savedViews, id, updates))
    },
    [savedViews]
  )
  const onUpdateView = userId == null ? keepUnsaved : viewCallbacks.onUpdateView

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
        .filter((pt) => !SYSTEM_PAGE_TYPES.has(String(pt.properties?.slug ?? "")))
        .map((pt) => ({
          id: pt._id,
          name: nameOf(pt.properties),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [pageTypes]
  )

  const navTypeDefinitions = useMemo<readonly PropertyDefinition[]>(() => {
    const navTypeId =
      typeof navItemPage?.properties.pageTypeId === "string"
        ? navItemPage.properties.pageTypeId
        : undefined
    if (navTypeId == null) return []
    const navType = pageTypes.find((pt) => pt._id === navTypeId)
    if (navType == null) return []
    return parsePageTypeData(navType.properties).propertyDefinitions
  }, [pageTypes, navItemPage])

  const navData = useMemo(() => toPageDataJSON(navItemPage?.properties), [navItemPage])

  const pageName = nameOf(navItemPage?.properties)
  const phrase = usePhrase()

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
                  <span className="sr-only">{phrase(viewBack.slug)}</span>
                </PagesUILink>
              )}
              {editing ? (
                <EditableTitle value={pageName} onSave={handleRename} />
              ) : (
                <h1 className={PAGE_TITLE_CLASSES}>{pageName}</h1>
              )}
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
          title: phrase(viewPageEmptyTitle.slug),
          description: phrase(viewPageEmpty.slug),
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
              onUpdateView={onUpdateView}
              pageTypeOptions={pageTypeOptions}
            />
          </TabsContent>
        ))}
      </PageSystemShell>
    </div>
  )
}
