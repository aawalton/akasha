"use client"

import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { GOAL_NONE_ID } from "@akasha/temper-items-rules-core/inventory-rule-goals"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule, ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { useCallback, useMemo, useRef } from "react"
import { getActionLabel } from "../action-options/action-options.module.code.ts"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
  RuleSortField,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import {
  ACTIVE_STATUS_ITEMS,
  GOAL_FILTER_ITEMS,
  LOCK_STATUS_ITEMS,
} from "../inventory-rules-filter-items/inventory-rules-filter-items.module.code.tsx"
import {
  buildActionFilterPredicate,
  buildCategoryMatchIds,
  buildCategorySearchText,
  matchesCategoryFilter,
  matchItemLocation as matchItemLocationPure,
  partitionRules,
} from "../inventory-rules-filter-predicates/inventory-rules-filter-predicates.module.code.ts"
import {
  sortCategoryRules,
  sortItemRules,
} from "../inventory-rules-sort/inventory-rules-sort.module.code.ts"

export interface DeferredRuleFilters {
  ruleStatus: readonly ActiveStatusFilter[]
  ruleLock: readonly LockStatusFilter[]
  ruleGoal: readonly string[]
  ruleAction: string | null
  ruleCategory: string
  ruleLocation: string | null
  ruleSearch: string
  ruleSortBy: RuleSortField
  ruleSortDir: SortDirection
}

interface LiveRuleSort {
  ruleSortBy: RuleSortField
  ruleSortDir: SortDirection
}

interface RuleFilterResult {
  hasAnyFilter: boolean
  hasSortActive: boolean
  hasLocationFilter: boolean
  filteredCharacterRules: readonly CategoryRule[]
  filteredCompanionRules: readonly CategoryRule[]
  filteredControlledCharacterRules: readonly CategoryRule[]
  filteredControlledCompanionRules: readonly CategoryRule[]
  filteredCategoryRules: readonly CategoryRule[]
  filteredItemRules: readonly ItemRule[]
  sortedCharacterRules: readonly CategoryRule[]
  sortedCompanionRules: readonly CategoryRule[]
  sortedCategoryRules: readonly CategoryRule[]
  sortedItemRules: readonly ItemRule[]
  visibleCharacterRuleIds: Set<string> | null
  visibleCompanionRuleIds: Set<string> | null
  visibleControlledCharacterRuleIds: Set<string> | null
  visibleControlledCompanionRuleIds: Set<string> | null
  visibleCategoryRuleIds: Set<string> | null
  visibleItemRuleIds: Set<string> | null
  characterPartition: {
    active: readonly string[]
    inactive: readonly string[]
    duplicate: readonly string[]
    locked: readonly string[]
    unlocked: readonly string[]
  }
  companionPartition: {
    active: readonly string[]
    inactive: readonly string[]
    duplicate: readonly string[]
    locked: readonly string[]
    unlocked: readonly string[]
  }
  categoryPartition: {
    active: readonly string[]
    inactive: readonly string[]
    duplicate: readonly string[]
    locked: readonly string[]
    unlocked: readonly string[]
  }
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  lockedItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
  matchItemLocation: (locationKey: string) => boolean
}

export function useInventoryRulesFilter(
  deferred: DeferredRuleFilters,
  liveSort: LiveRuleSort,
  characterRules: readonly CategoryRule[],
  companionRules: readonly CategoryRule[],
  categoryRules: readonly CategoryRule[],
  itemRules: readonly ItemRule[],
  controlledCharacterRules: readonly CategoryRule[],
  controlledCompanionRules: readonly CategoryRule[],
  duplicateRuleIds: Set<string>,
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null | undefined
): RuleFilterResult {
  const hasStatusFilter =
    deferred.ruleStatus.length > 0 && deferred.ruleStatus.length < ACTIVE_STATUS_ITEMS.length
  const hasLockFilter =
    deferred.ruleLock.length > 0 && deferred.ruleLock.length < LOCK_STATUS_ITEMS.length
  const hasGoalFilter =
    deferred.ruleGoal.length > 0 && deferred.ruleGoal.length < GOAL_FILTER_ITEMS.length
  const hasActionFilter = deferred.ruleAction !== null
  const hasCategoryFilter = deferred.ruleCategory.length > 0
  const hasLocationFilter = deferred.ruleLocation !== null
  const hasSearchFilter = deferred.ruleSearch.length > 0
  const hasSortActive = liveSort.ruleSortBy !== "priority"

  const hasAnyFilter =
    hasStatusFilter ||
    hasLockFilter ||
    hasGoalFilter ||
    hasActionFilter ||
    hasCategoryFilter ||
    hasLocationFilter ||
    hasSearchFilter

  const showActive = deferred.ruleStatus.includes("active")
  const showInactive = deferred.ruleStatus.includes("inactive")
  const showDuplicate = deferred.ruleStatus.includes("duplicate")
  const showLocked = deferred.ruleLock.includes("locked")
  const showUnlocked = deferred.ruleLock.includes("unlocked")

  const goalFilterValues = useMemo(() => new Set(deferred.ruleGoal), [deferred.ruleGoal])

  const actionFilterPredicate = useMemo(
    () => buildActionFilterPredicate(deferred.ruleAction),
    [deferred.ruleAction]
  )

  const searchLower = useMemo(() => deferred.ruleSearch.toLowerCase(), [deferred.ruleSearch])

  const searchTextCacheRef = useRef<Map<string, { text: string; key: string }>>(new Map())

  const getCategoryRuleSearchText = useCallback((r: CategoryRule): string => {
    const cacheKey = `${r.title ?? ""}|${r.notes ?? ""}|${r.categoryId}|${r.action}`
    const cached = searchTextCacheRef.current.get(r.id)
    if (cached && cached.key === cacheKey) return cached.text

    const text = buildCategorySearchText(r)
    searchTextCacheRef.current.set(r.id, { text, key: cacheKey })
    return text
  }, [])

  const matchItemLocation = useCallback(
    (locationKey: string): boolean => matchItemLocationPure(locationKey, deferred.ruleLocation),
    [deferred.ruleLocation]
  )

  const categoryMatchIds = useMemo(
    () => buildCategoryMatchIds(deferred.ruleCategory),
    [deferred.ruleCategory]
  )

  const filterDeps = {
    hasAnyFilter,
    hasGoalFilter,
    hasStatusFilter,
    hasLockFilter,
    hasActionFilter,
    hasSearchFilter,
    hasCategoryFilter,
    hasLocationFilter,
    showActive,
    showInactive,
    showDuplicate,
    showLocked,
    showUnlocked,
    goalFilterValues,
    actionFilterPredicate,
    searchLower,
    categoryMatchIds,
    duplicateRuleIds,
    affectedItemsMap,
    matchItemLocation,
    getCategoryRuleSearchText,
  }
  const filterDepsRef = useRef(filterDeps)
  filterDepsRef.current = filterDeps

  function filterCategoryRuleSubset(subset: readonly CategoryRule[]): readonly CategoryRule[] {
    const fd = filterDepsRef.current
    if (!fd.hasAnyFilter) return subset
    return subset.filter((r) => {
      const matchesGoal = !fd.hasGoalFilter || fd.goalFilterValues.has(r.goal ?? GOAL_NONE_ID)
      const matchesStatus =
        !fd.hasStatusFilter ||
        (fd.showActive && r.active !== false) ||
        (fd.showInactive && r.active === false) ||
        (fd.showDuplicate && fd.duplicateRuleIds.has(r.id))
      const matchesLock =
        !fd.hasLockFilter || (fd.showLocked && r.locked === true) || (fd.showUnlocked && !r.locked)
      const matchesAction =
        !fd.hasActionFilter ||
        (fd.actionFilterPredicate?.(
          r.action,
          r.destination,
          r.stockScope,
          r.conditions?.canInspire
        ) ??
          false)
      const matchesSearch =
        !fd.hasSearchFilter || fd.getCategoryRuleSearchText(r).includes(fd.searchLower)
      const matchesCategory = matchesCategoryFilter(r.categoryId, fd.categoryMatchIds)
      const matchesLocation =
        !fd.hasLocationFilter ||
        (fd.affectedItemsMap?.get(r.id) ?? []).some((item) =>
          fd.matchItemLocation(item.locationKey)
        )
      return (
        matchesGoal &&
        matchesStatus &&
        matchesLock &&
        matchesAction &&
        matchesSearch &&
        matchesCategory &&
        matchesLocation
      )
    })
  }

  const filterDepArray = [
    hasAnyFilter,
    hasGoalFilter,
    hasStatusFilter,
    hasLockFilter,
    hasActionFilter,
    hasSearchFilter,
    hasCategoryFilter,
    hasLocationFilter,
    showActive,
    showInactive,
    showDuplicate,
    showLocked,
    showUnlocked,
    goalFilterValues,
    actionFilterPredicate,
    searchLower,
    categoryMatchIds,
    duplicateRuleIds,
    affectedItemsMap,
    matchItemLocation,
    getCategoryRuleSearchText,
  ]

  const filteredCharacterRules = useMemo(
    () => filterCategoryRuleSubset(characterRules),
    [characterRules, ...filterDepArray]
  )

  const filteredCompanionRules = useMemo(
    () => filterCategoryRuleSubset(companionRules),
    [companionRules, ...filterDepArray]
  )

  const filteredCategoryRules = useMemo(
    () => filterCategoryRuleSubset(categoryRules),
    [categoryRules, ...filterDepArray]
  )

  const filteredControlledCharacterRules = useMemo(
    () => filterCategoryRuleSubset(controlledCharacterRules),
    [controlledCharacterRules, ...filterDepArray]
  )

  const filteredControlledCompanionRules = useMemo(
    () => filterCategoryRuleSubset(controlledCompanionRules),
    [controlledCompanionRules, ...filterDepArray]
  )

  const filteredItemRules = useMemo(
    () =>
      hasAnyFilter
        ? itemRules.filter((r) => {
            const matchesGoal = !hasGoalFilter || goalFilterValues.has(r.goal ?? GOAL_NONE_ID)
            const matchesStatus =
              !hasStatusFilter ||
              (showActive && r.active !== false) ||
              (showInactive && r.active === false)
            const matchesLock =
              !hasLockFilter || (showLocked && r.locked === true) || (showUnlocked && !r.locked)
            const matchesAction =
              !hasActionFilter || (actionFilterPredicate?.(r.action, r.destination) ?? false)
            const matchesSearch =
              !hasSearchFilter ||
              (r.title ?? r.itemName).toLowerCase().includes(searchLower) ||
              (r.notes ?? "").toLowerCase().includes(searchLower) ||
              getActionLabel(r.action).toLowerCase().includes(searchLower)
            const matchesLocation =
              !hasLocationFilter ||
              (affectedItemsMap?.get(r.id) ?? []).some((item) =>
                matchItemLocation(item.locationKey)
              )
            return (
              matchesGoal &&
              matchesStatus &&
              matchesLock &&
              matchesAction &&
              matchesSearch &&
              matchesLocation
            )
          })
        : itemRules,
    [
      itemRules,
      hasAnyFilter,
      hasGoalFilter,
      hasStatusFilter,
      hasLockFilter,
      hasActionFilter,
      hasSearchFilter,
      hasLocationFilter,
      showActive,
      showInactive,
      showLocked,
      showUnlocked,
      goalFilterValues,
      actionFilterPredicate,
      searchLower,
      affectedItemsMap,
      matchItemLocation,
    ]
  )

  const sortDeps = [
    liveSort.ruleSortBy,
    liveSort.ruleSortDir,
    hasSortActive,
    getCategoryRuleSearchText,
  ] as const

  const sortedCharacterRules = useMemo(
    () =>
      sortCategoryRules(
        characterRules,
        liveSort.ruleSortBy,
        liveSort.ruleSortDir,
        getCategoryRuleSearchText
      ),
    [characterRules, ...sortDeps]
  )
  const sortedCompanionRules = useMemo(
    () =>
      sortCategoryRules(
        companionRules,
        liveSort.ruleSortBy,
        liveSort.ruleSortDir,
        getCategoryRuleSearchText
      ),
    [companionRules, ...sortDeps]
  )
  const sortedCategoryRules = useMemo(
    () =>
      sortCategoryRules(
        categoryRules,
        liveSort.ruleSortBy,
        liveSort.ruleSortDir,
        getCategoryRuleSearchText
      ),
    [categoryRules, ...sortDeps]
  )
  const sortedItemRules = useMemo(
    () => sortItemRules(itemRules, liveSort.ruleSortBy, liveSort.ruleSortDir),
    [itemRules, ...sortDeps]
  )

  const characterPartition = useMemo(
    () => partitionRules(filteredCharacterRules, duplicateRuleIds),
    [filteredCharacterRules, duplicateRuleIds]
  )
  const companionPartition = useMemo(
    () => partitionRules(filteredCompanionRules, duplicateRuleIds),
    [filteredCompanionRules, duplicateRuleIds]
  )
  const categoryPartition = useMemo(
    () => partitionRules(filteredCategoryRules, duplicateRuleIds),
    [filteredCategoryRules, duplicateRuleIds]
  )

  const activeItemRuleIds = useMemo(
    () => filteredItemRules.filter((r) => r.active !== false).map((r) => r.id),
    [filteredItemRules]
  )
  const inactiveItemRuleIds = useMemo(
    () => filteredItemRules.filter((r) => r.active === false).map((r) => r.id),
    [filteredItemRules]
  )
  const lockedItemRuleIds = useMemo(
    () => filteredItemRules.filter((r) => r.locked === true).map((r) => r.id),
    [filteredItemRules]
  )
  const unlockedItemRuleIds = useMemo(
    () => filteredItemRules.filter((r) => !r.locked).map((r) => r.id),
    [filteredItemRules]
  )

  const visibleCharacterRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredCharacterRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredCharacterRules]
  )
  const visibleCompanionRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredCompanionRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredCompanionRules]
  )
  const visibleControlledCharacterRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredControlledCharacterRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredControlledCharacterRules]
  )
  const visibleControlledCompanionRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredControlledCompanionRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredControlledCompanionRules]
  )
  const visibleCategoryRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredCategoryRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredCategoryRules]
  )
  const visibleItemRuleIds = useMemo(
    () => (hasAnyFilter ? new Set(filteredItemRules.map((r) => r.id)) : null),
    [hasAnyFilter, filteredItemRules]
  )

  return {
    hasAnyFilter,
    hasSortActive,
    hasLocationFilter,
    filteredCharacterRules,
    filteredCompanionRules,
    filteredControlledCharacterRules,
    filteredControlledCompanionRules,
    filteredCategoryRules,
    filteredItemRules,
    sortedCharacterRules,
    sortedCompanionRules,
    sortedCategoryRules,
    sortedItemRules,
    visibleCharacterRuleIds,
    visibleCompanionRuleIds,
    visibleControlledCharacterRuleIds,
    visibleControlledCompanionRuleIds,
    visibleCategoryRuleIds,
    visibleItemRuleIds,
    characterPartition,
    companionPartition,
    categoryPartition,
    activeItemRuleIds,
    inactiveItemRuleIds,
    lockedItemRuleIds,
    unlockedItemRuleIds,
    matchItemLocation,
  }
}
