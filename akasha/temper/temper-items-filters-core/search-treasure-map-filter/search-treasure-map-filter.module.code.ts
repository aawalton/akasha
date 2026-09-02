import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

const SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP = 100

export const TREASURE_MAP_FILTER = defineFilter<FilterToggleValue>({
  id: "treasure-map",
  label: "Treasure Map",
  group: "type",
  editor: { kind: "toggle" },
  matches(facts, value) {
    if (facts.specializedItemType === undefined) return false
    const isTreasureMap = facts.specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP
    return value === "include" ? isTreasureMap : !isTreasureMap
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
