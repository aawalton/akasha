export type FilterId = "status" | "activity"

export const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>(["status", "activity"])

export function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

export interface AccountFilterDef {
  id: FilterId
  label: string
}

export const ACCOUNT_FILTERS: AccountFilterDef[] = [
  { id: "status", label: "Status" },
  { id: "activity", label: "Activity" },
]
