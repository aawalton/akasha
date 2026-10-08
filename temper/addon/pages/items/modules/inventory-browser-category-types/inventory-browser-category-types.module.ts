import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserCategoryTypes = {
  id: "01a0e124-72af-727a-9217-cd5bcf763d0f",
  type: "page-type/module",
  slug: "inventory-browser-category-types",
  definition:
    "the game numbers an item browser category matches items against, read from its links",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category gives its sorts, then its weights or weapon kinds, then places worn, then narrower sorts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An armor weight gives its armor type where a category matches armor, else its weapon number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link to no page the numbers know is passed over.",
    },
  ],
  createdAt: "2026-09-27T04:34:17.391Z",
  updatedAt: "2026-09-27T04:34:39.000Z",
} as const satisfies Module
