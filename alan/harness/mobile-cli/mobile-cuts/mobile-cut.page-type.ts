import type { PageType } from "@akasha/pages/page-type"

export const mobileCut = {
  id: "019f5141-c410-7cd1-b491-d017f10e568d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "mobile-cut",
  definition: "one build of an app, and the state of the tree it was built from",
  pluralSlug: "mobile-cuts",
  extends: ["page-type/page"],
  parts: [
    "instant-property/cut-at",
    "number-property/build-number",
    "text-property/build-input-tree-hash",
    "text-property/main-sha",
    "text-property/shell-sha",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/app", required: true, many: false },
    { pageProperty: "number-property/build-number", required: true, many: false },
    { pageProperty: "text-property/main-sha", required: true, many: false },
    { pageProperty: "text-property/shell-sha", required: false, many: false },
    { pageProperty: "text-property/build-input-tree-hash", required: false, many: false },
    { pageProperty: "instant-property/cut-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut is named for its app and its build number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut made before the build input tree hash was recorded has no hash and reads as owed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which cut is newest is settled by its build number rather than by when its file landed.",
    },
    {
      invariantKind: "departure",
      statement: "A cut names the app that cut is of rather than repeating that app's values.",
    },
  ],
  types: "ts",
} as const satisfies PageType
