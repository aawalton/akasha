"use client"

import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import {
  PageLayout,
  PageLayoutSkeleton,
  PageTitle,
  PageTitleBadges,
} from "@akasha/design-layout/page-layout"
import { scrollToCard } from "@akasha/design-layout/scroll-to-card"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { PageTabsTrigger, Tabs, TabsList } from "@akasha/design-patterns/tabs"
import { Button } from "@akasha/design-primitives/button"
import { useDebouncedValue } from "@akasha/design-primitives/use-debounced-value"
import { useKeyboardBinding } from "@akasha/design-primitives/use-keyboard-registry"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import {
  ACTIVITY_CATEGORIES,
  type ActivityCategoryId,
} from "@akasha/temper-player-completion/activity-categories"
import { getCompletionCardTab } from "@akasha/temper-player-completion/completion-card-tab"
import {
  isAccountMeasured,
  isCharacterMeasured,
  isCompanionMeasured,
} from "@akasha/temper-player-completion/completion-measured"
import { CompletionActivityModeContext } from "@akasha/temper-player-completion-ui/completion-activity-mode-context"
import type {
  CompletionFilter,
  CompletionSortMode,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { CompletionSearchContext } from "@akasha/temper-player-completion-ui/completion-search-context"
import { ChevronLeft, Globe, Handshake, LayoutDashboard, Swords } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { CompletionAccountTab } from "../completion-account-tab/completion-account-tab.module.code.tsx"
import { CompletionCharactersTab } from "../completion-characters-tab/completion-characters-tab.module.code.tsx"
import { CompletionCompanionsTab } from "../completion-companions-tab/completion-companions-tab.module.code.tsx"
import { CompletionPageEmpty } from "../completion-page-empty/completion-page-empty.module.code.tsx"
import {
  buildActivityItems,
  SKILL_TYPE_ITEMS,
  SORT_OPTIONS,
  STATUS_ITEMS,
  VALID_TABS,
} from "../completion-page-filter-constants/completion-page-filter-constants.module.code.ts"
import { CompletionPageOwnEmpty } from "../completion-page-own-empty/completion-page-own-empty.module.code.tsx"
import { CompletionSummaryTab } from "../completion-summary-tab/completion-summary-tab.module.code.tsx"
import {
  type CompletionToolbarContextValue,
  CompletionToolbarProvider,
} from "../completion-toolbar-context/completion-toolbar-context.module.code.tsx"
import { useCompletionFilters } from "../use-completion-filters/use-completion-filters.module.code.ts"
import { useCompletionProgress } from "../use-completion-progress/use-completion-progress.module.code.ts"

interface CompletionPageContentProps {
  viewUserId?: string
  initialTab?: string
  initialCharacter?: string
  initialCompanion?: string
  initialActivityMode?: string
  initialScrollTo?: string
}

export function CompletionPageContent({
  viewUserId,
  initialTab,
  initialCharacter,
  initialCompanion,
  initialActivityMode,
  initialScrollTo,
}: CompletionPageContentProps) {
  const {
    accountProgress,
    characterProgress,
    companionProgressData,
    accountSummary,
    characterSummary,
    companionSummary,
    characterItems,
    account,
    rows,
    companionRows,
    isLoading,
  } = useCompletionProgress(viewUserId)

  const { values, update } = useCompletionFilters({
    viewUserId,
    initialTab,
    initialCharacter,
    initialCompanion,
    initialActivityMode,
    initialScrollTo,
  })

  const pendingScrollRef = useRef<{ cardId: string; tabChanged: boolean } | null>(null)

  useEffect(() => {
    const pending = pendingScrollRef.current
    if (pending) {
      pendingScrollRef.current = null
      scrollToCard(pending.cardId, pending.tabChanged)
    }
  }, [values.tab])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === "") return
    const tab = getCompletionCardTab(hash)
    if (tab == null) return
    if (values.tab === tab) {
      scrollToCard(hash, false)
    } else {
      pendingScrollRef.current = { cardId: hash, tabChanged: true }
      update({ tab })
    }
  }, [])

  const currentTabRef = useRef(values.tab)
  currentTabRef.current = values.tab
  useEffect(() => {
    const target = values.scrollTo
    if (target == null) return
    const tab = getCompletionCardTab(target)
    if (tab == null) return
    if (currentTabRef.current === tab) {
      scrollToCard(target, false)
      update({ scrollTo: null })
    } else {
      pendingScrollRef.current = { cardId: target, tabChanged: true }
      update({ tab, scrollTo: null })
    }
  }, [values.scrollTo, update])

  function handleOverallClick(key: string) {
    if (VALID_TABS.has(key) && key !== "summary") {
      update({ tab: key }, { push: true })
    }
  }

  function navigateToCard(targetTab: string) {
    return (key: string) => {
      if (values.tab === targetTab) {
        scrollToCard(key, false)
      } else {
        pendingScrollRef.current = { cardId: key, tabChanged: true }
        update({ tab: targetTab }, { push: true })
      }
    }
  }

  const selectedStatus = useMemo(
    () => STATUS_ITEMS.filter((s) => values.completionFilter.includes(s.value)),
    [values.completionFilter]
  )

  const activityCategoryFilter: ActivityCategoryId[] = values.activity.filter(
    (x): x is ActivityCategoryId => ACTIVITY_CATEGORIES.has(x)
  )

  const completionFilter: CompletionFilter = values.completionFilter.filter(
    (x): x is "not-started" | "in-progress" | "done" =>
      x === "not-started" || x === "in-progress" || x === "done"
  )

  const toggleDebug = useCallback(() => update({ debug: !values.debug }), [update, values.debug])
  useKeyboardBinding({
    id: "completion.toggle-debug",
    chord: "Mod+Alt+A",
    label: "Toggle completion debug view",
    onTrigger: toggleDebug,
  })
  const activityItems = useMemo(() => buildActivityItems(values.debug), [values.debug])

  const selectedActivity = useMemo(
    () => activityItems.filter((a) => values.activity.includes(a.value)),
    [values.activity, activityItems]
  )

  const selectedSkillType = useMemo(
    () => SKILL_TYPE_ITEMS.filter((s) => values.skillType.includes(s.value)),
    [values.skillType]
  )

  const handleActivitySelect = (items: readonly BadgeToggleGroupItem[]) => {
    update({ activity: items.map((item) => item.value) })
  }

  const handleSkillTypeSelect = (items: readonly BadgeToggleGroupItem[]) => {
    update({ skillType: items.map((item) => item.value) })
  }

  const debouncedSearch = useDebouncedValue(values.search, 300)

  const completionHasActiveFilters =
    values.search.length > 0 ||
    values.completionFilter.length > 0 ||
    values.activity.length > 0 ||
    values.skillType.length > 0 ||
    values.character !== null ||
    values.companion !== null ||
    values.sortMode !== "status" ||
    values.sortDirection !== "asc"

  const handleResetCompletion = useCallback(
    () =>
      update({
        search: "",
        completionFilter: [],
        activity: [],
        skillType: [],
        character: null,
        companion: null,
        sortMode: "status",
        sortDirection: "asc",
      }),
    [update]
  )

  const toolbar: CompletionToolbarContextValue = useMemo(
    () => ({
      completionFilter,
      sortMode: values.sortMode,
      sortDirection: values.sortDirection,
      sortOptions: SORT_OPTIONS,
      search: values.search,
      selectedStatus,
      statusItems: STATUS_ITEMS,
      hasActiveFilters: completionHasActiveFilters,
      onReset: handleResetCompletion,
      onStatusSelect: (items: readonly BadgeToggleGroupItem[]) =>
        update({ completionFilter: items.map((item) => item.value) }),
      onSortChange: (field: CompletionSortMode, direction: SortDirection) =>
        update({ sortMode: field, sortDirection: direction }),
      onSearchChange: (v: string) => update({ search: v }),
    }),
    [
      completionFilter,
      values.sortMode,
      values.sortDirection,
      values.search,
      selectedStatus,
      completionHasActiveFilters,
      handleResetCompletion,
      update,
    ]
  )

  const hasMeasuredData =
    rows.some((row) => isCharacterMeasured(row.completion)) ||
    companionRows.some((row) => isCompanionMeasured(row.completion)) ||
    isAccountMeasured(account)

  const isViewEmpty = viewUserId != null && !hasMeasuredData

  const isOwnEmpty = viewUserId == null && !hasMeasuredData

  if (isLoading) {
    return (
      <PageLayoutSkeleton
        config={tabbedPageSkeleton({
          initialTab: values.tab,
          defaultTab: "summary",
          tabs: ["summary", "account", "characters", "companions"],
          titleWidth: 140,
        })}
      />
    )
  }

  if (isViewEmpty) {
    return <CompletionPageEmpty />
  }

  if (isOwnEmpty) {
    return <CompletionPageOwnEmpty />
  }

  return (
    <CompletionActivityModeContext.Provider value={values.debug}>
      <CompletionSearchContext.Provider value={debouncedSearch}>
        <CompletionToolbarProvider value={toolbar}>
          <PageLayout
            skeleton={tabbedPageSkeleton({
              titleWidth: 140,
              initialTab,
              defaultTab: "summary",
              tabs: ["summary", "account", "characters", "companions"],
            })}
          >
            <PageLayout.Header>
              <div className="flex min-w-0 items-center gap-4">
                {viewUserId == null && (
                  <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
                    <Link href="/home">
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <PageTitle>Completion</PageTitle>
                {viewUserId != null && (
                  <PageTitleBadges>
                    <Globe className="size-4 text-tertiary" />
                  </PageTitleBadges>
                )}
              </div>
            </PageLayout.Header>

            <Tabs
              value={values.tab}
              onValueChange={(v) => {
                if (window.location.hash !== "") {
                  history.replaceState(null, "", window.location.pathname + window.location.search)
                }
                update({ tab: v })
              }}
            >
              <PageLayout.Tabs>
                <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-4 grid-cols-4 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
                  <PageTabsTrigger value="summary" icon={<LayoutDashboard />} label="Summary" />
                  <PageTabsTrigger value="account" icon={<Globe />} label="Account" />
                  <PageTabsTrigger value="characters" icon={<Swords />} label="Characters" />
                  <PageTabsTrigger value="companions" icon={<Handshake />} label="Companions" />
                </TabsList>
              </PageLayout.Tabs>

              <PageLayout.Content>
                <CompletionSummaryTab
                  active={values.tab === "summary"}
                  accountSummary={accountSummary}
                  characterSummary={characterSummary}
                  companionSummary={companionSummary}
                  onOverallClick={handleOverallClick}
                  onAccountSummaryClick={navigateToCard("account")}
                  onCharacterSummaryClick={navigateToCard("characters")}
                  onCompanionSummaryClick={navigateToCard("companions")}
                />
                <CompletionAccountTab
                  active={values.tab === "account"}
                  accountSummary={accountSummary}
                  accountProgress={accountProgress}
                  activityCategoryFilter={activityCategoryFilter}
                  selectedActivity={selectedActivity}
                  activityItems={activityItems}
                  onActivitySelect={handleActivitySelect}
                />
                <CompletionCharactersTab
                  active={values.tab === "characters"}
                  characterProgress={characterProgress}
                  activityCategoryFilter={activityCategoryFilter}
                  selectedActivity={selectedActivity}
                  activityItems={activityItems}
                  character={values.character}
                  characterItems={characterItems}
                  selectedSkillType={selectedSkillType}
                  skillTypeItems={SKILL_TYPE_ITEMS}
                  onActivitySelect={handleActivitySelect}
                  onSkillTypeSelect={handleSkillTypeSelect}
                  onCharacterChange={(v) => update({ character: v })}
                  onCharacterSummaryClick={navigateToCard("characters")}
                  characterSummary={characterSummary}
                />
                <CompletionCompanionsTab
                  active={values.tab === "companions"}
                  companion={values.companion}
                  onCompanionChange={(v) => update({ companion: v })}
                  onCompanionSummaryClick={navigateToCard("companions")}
                  companionSummary={companionSummary}
                  companionProgressData={companionProgressData}
                />
              </PageLayout.Content>
            </Tabs>
          </PageLayout>
        </CompletionToolbarProvider>
      </CompletionSearchContext.Provider>
    </CompletionActivityModeContext.Provider>
  )
}
