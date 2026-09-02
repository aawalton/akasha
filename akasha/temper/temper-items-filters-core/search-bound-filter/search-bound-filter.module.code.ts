import { checkFlags } from "@akasha/temper-items-rules-eval/check-flags"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

export const BOUND_FILTER = defineFilter<FilterToggleValue>({
  id: "bound",
  label: "Bound",
  group: "state",
  editor: { kind: "toggle" },
  matches(facts, value) {
    return runChecker(checkFlags, facts, { bound: value === "include" ? "bound" : "not-bound" })
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
