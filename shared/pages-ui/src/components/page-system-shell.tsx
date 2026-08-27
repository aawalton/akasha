"use client"

import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@shared/design-patterns/components/empty"
import { PageTabsTrigger, Tabs, TabsList } from "@shared/design-patterns/components/tabs"
import type { ReactNode } from "react"
import { useMemo } from "react"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import type { ViewCallbacks } from "../mutators/views"
import { deriveShellEmptyState } from "./page-system-shell-helpers"
import type { ViewTabItem } from "./view-tab-context-menu"
import { ViewTabs } from "./view-tabs"

interface PageSystemShellTab {
  id: string
  label: string
  icon: ReactNode
}

interface PageSystemShellProps {
  title: ReactNode
  tabs: readonly PageSystemShellTab[]
  loading?: boolean
  empty?: { icon?: ReactNode; title: string; description: string }
  storagePrefix?: string
  syncUrl?: boolean
  activeTab?: string
  onActiveTabChange?: (tab: string) => void
  views?: readonly ViewTabItem[]
  viewCallbacks?: ViewCallbacks
  currentViewData?: ViewDataJSON
  children: ReactNode
}

export function PageSystemShell({
  title,
  tabs,
  loading = false,
  empty,
  storagePrefix = "pages",
  syncUrl,
  activeTab,
  onActiveTabChange,
  views,
  viewCallbacks,
  currentViewData,
  children,
}: PageSystemShellProps) {
  const useViewTabs = views != null && viewCallbacks != null
  const effectiveTabs = useMemo(
    () => (useViewTabs && views !== undefined ? views.map((v) => v.id) : tabs.map((t) => t.id)),
    [useViewTabs, views, tabs]
  )
  const defaultTab = useViewTabs ? (views[0]?.id ?? "") : (tabs[0]?.id ?? "")

  const { showBareEmpty, showEmptyViewState } = deriveShellEmptyState({
    isViewMode: useViewTabs,
    viewCount: views?.length ?? 0,
    tabCount: tabs.length,
    loading,
  })

  const emptyCard = (
    <Empty>
      {empty?.icon}
      <EmptyHeader>
        <EmptyTitle>{empty?.title ?? "No items"}</EmptyTitle>
        <EmptyDescription>{empty?.description ?? "Nothing to display."}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )

  if (showBareEmpty) {
    return (
      <PageLayout>
        {title != null && (
          <PageLayout.Header>
            {typeof title === "string" ? <PageTitle>{title}</PageTitle> : title}
          </PageLayout.Header>
        )}
        <PageLayout.Content>{emptyCard}</PageLayout.Content>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      loading={loading}
      skeleton={tabbedPageSkeleton({ defaultTab, tabs: effectiveTabs })}
    >
      {}
      {title != null && (
        <PageLayout.Header>
          {typeof title === "string" ? <PageTitle>{title}</PageTitle> : title}
        </PageLayout.Header>
      )}

      <Tabs
        {...(activeTab !== undefined
          ? { value: activeTab, onValueChange: onActiveTabChange }
          : { defaultValue: defaultTab })}
        syncUrl={syncUrl}
        syncStorage={`${storagePrefix}:tab`}
      >
        {useViewTabs ? (
          <PageLayout.Tabs>
            <ViewTabs
              views={views}
              callbacks={viewCallbacks}
              currentViewData={currentViewData}
              activeViewId={activeTab ?? defaultTab}
            />
          </PageLayout.Tabs>
        ) : (
          tabs.length > 1 && (
            <PageLayout.Tabs>
              <TabsList>
                {tabs.map((tab) => (
                  <PageTabsTrigger key={tab.id} value={tab.id} icon={tab.icon} label={tab.label} />
                ))}
              </TabsList>
            </PageLayout.Tabs>
          )
        )}

        <PageLayout.Content>{showEmptyViewState ? emptyCard : children}</PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
