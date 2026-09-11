import type { Dispatch, SetStateAction } from "react"

export function addFilterId<Id extends string>(
  id: string,
  isFilterId: (value: string) => value is Id,
  setAddedFilters: Dispatch<SetStateAction<Set<Id>>>
): undefined {
  if (!isFilterId(id)) return
  setAddedFilters((prev) => new Set(prev).add(id))
}
