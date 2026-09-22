import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreInitSearchUi = {
  id: "01a061fc-ceeb-71e2-af64-075a353ff4c6",
  type: "page-type/module",
  slug: "sets-core-init-search-ui",
  definition: "the keyboard search window found by name and handed to its initializer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here runs before the library reports itself fully loaded.",
    },
  ],
} as const satisfies Module
