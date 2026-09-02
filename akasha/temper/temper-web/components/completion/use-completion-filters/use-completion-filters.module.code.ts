import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { useFilterPersistence } from "@akasha/design-patterns/use-filter-persistence"
import { ACTIVITY_CATEGORIES } from "@akasha/temper-player-completion/activity-categories"
import { getCompletionCardTab } from "@akasha/temper-player-completion/completion-card-tab"
import type { CompletionSortMode } from "@akasha/temper-player-completion-ui/completion-panel-card"
import {
  VALID_SKILL_TYPES,
  VALID_STATUSES,
  VALID_TABS,
} from "../completion-page-filter-constants/completion-page-filter-constants.module.code.ts"

export type CompletionFilterValues = {
  tab: string
  search: string
  character: string | null
  companion: string | null
  completionFilter: readonly string[]
  activity: readonly string[]
  skillType: readonly string[]
  sortMode: CompletionSortMode
  sortDirection: SortDirection
  debug: boolean
  scrollTo: string | null
}

interface UseCompletionFiltersArgs {
  viewUserId: string | undefined
  initialTab: string | undefined
  initialCharacter: string | undefined
  initialCompanion: string | undefined
  initialActivityMode: string | undefined
  initialScrollTo: string | undefined
}

export function useCompletionFilters({
  viewUserId,
  initialTab,
  initialCharacter,
  initialCompanion,
  initialActivityMode,
  initialScrollTo,
}: UseCompletionFiltersArgs) {
  return useFilterPersistence<CompletionFilterValues>({
    storageKey:
      viewUserId != null
        ? `temper:completion:view:${viewUserId}:filters`
        : "temper:completion:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "summary",
        initial: initialTab,
        validate: (raw) => (typeof raw === "string" && VALID_TABS.has(raw) ? raw : undefined),
        toParam: (v) => (v === "summary" ? null : v),
      },
      search: {
        urlParam: "q",
        defaultValue: "",
        validate: (raw) => (typeof raw === "string" && raw.length > 0 ? raw : undefined),
        toParam: (v) => (v.length > 0 ? v : null),
      },
      character: {
        urlParam: "character",
        defaultValue: null,
        initial: initialCharacter,
        validate: (raw) => (typeof raw === "string" ? raw : undefined),
      },
      companion: {
        urlParam: "companion",
        defaultValue: null,
        initial: initialCompanion,
        validate: (raw) => (typeof raw === "string" ? raw : undefined),
      },
      completionFilter: {
        urlParam: "status",
        defaultValue: [],
        validate: (raw) => {
          const items = Array.isArray(raw)
            ? raw.filter((x): x is string => typeof x === "string")
            : typeof raw === "string"
              ? raw.split(",")
              : []
          const valid = items.filter((x) => VALID_STATUSES.has(x))
          return valid.length > 0 ? valid : undefined
        },
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      activity: {
        urlParam: "activity",
        defaultValue: [],
        validate: (raw) => {
          const items = Array.isArray(raw)
            ? raw.filter((x): x is string => typeof x === "string")
            : typeof raw === "string"
              ? raw.split(",")
              : []
          const valid = items.filter((x) => ACTIVITY_CATEGORIES.has(x))
          return valid.length > 0 ? valid : undefined
        },
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      skillType: {
        urlParam: "skill-type",
        defaultValue: [],
        validate: (raw) => {
          const items = Array.isArray(raw)
            ? raw.filter((x): x is string => typeof x === "string")
            : typeof raw === "string"
              ? raw.split(",")
              : []
          const valid = items.filter((x) => VALID_SKILL_TYPES.has(x))
          return valid.length > 0 ? valid : undefined
        },
        toParam: (v) => (v.length > 0 ? v.join(",") : null),
      },
      sortMode: {
        urlParam: "sort",
        defaultValue: "status" satisfies CompletionSortMode,
        validate: (raw) =>
          raw === "status" || raw === "percent" || raw === "name" ? raw : undefined,
        toParam: (v) => (v === "status" ? null : v),
      },
      sortDirection: {
        urlParam: "sortDir",
        defaultValue: "asc" satisfies SortDirection,
        validate: (raw) => (raw === "asc" || raw === "desc" ? raw : undefined),
        toParam: (v) => (v === "asc" ? null : v),
      },
      debug: {
        urlParam: "activity-mode",
        defaultValue: false,
        initial: initialActivityMode,
        validate: (raw) => (raw === "true" || raw === true ? true : undefined),
        toParam: (v) => (v ? "true" : null),
      },
      scrollTo: {
        urlParam: "scrollTo",
        defaultValue: null,
        initial: initialScrollTo,
        validate: (raw) =>
          typeof raw === "string" && getCompletionCardTab(raw) != null ? raw : undefined,
      },
    },
  })
}
