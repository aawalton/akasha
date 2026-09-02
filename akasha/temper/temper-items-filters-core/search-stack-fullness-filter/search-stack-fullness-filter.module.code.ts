import { checkStackFullness } from "@akasha/temper-items-rules-eval/check-stack-fullness"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

export const STACK_FULLNESS_FILTER = defineFilter<FilterToggleValue>({
  id: "stack-fullness",
  label: "Stack Fullness",
  group: "state",
  editor: { kind: "toggle" },
  matches(facts, toggle) {
    const stackFullness = toggle === "include" ? "full" : "partial"
    return runChecker(checkStackFullness, facts, { stackFullness })
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
