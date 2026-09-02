import type { Module } from "@akasha/code-system/module"

export const libSetsCoreInitSearchUi = {
  id: "01a061fc-ceeb-71e2-af64-075a353ff4c6",
  pageTypeSlug: "module",
  slug: "lib-sets-core-init-search-ui",
  definition: "the keyboard search window found by name and handed to its initializer",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Nothing here runs before the library reports itself fully loaded.",
    },
  ],
} as const satisfies Module
