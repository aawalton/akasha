import type { Module } from "@akasha/code-system/module"

export const libSetsCoreSetChecking = {
  id: "01a061fc-ceeb-7357-a58d-cb080d3977c2",
  pageTypeSlug: "module",
  slug: "lib-sets-core-set-checking",
  definition: "whether a set id still exists in the game at the API version now running",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A set is judged to exist only when an item id of that set builds a link the game names.",
    },
    {
      invariantKind: "constraint",
      statement: "A set id found inactive is remembered as inactive until the caches are cleared.",
    },
  ],
} as const satisfies Module
