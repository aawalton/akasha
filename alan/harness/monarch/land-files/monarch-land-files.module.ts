import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const monarchLandFiles = {
  id: "01a06863-ac0c-7ade-b991-f9f1ddf1dbed",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-land-files",
  definition:
    "the month pages and their transaction sidecars, composed from Monarch's rows and landed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A month page sits in a folder of its own with its transactions entry file beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A line is written in the entry shape's own key order however the line was built.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are sorted by day and then by Monarch's id.",
    },
    {
      invariantKind: "departure",
      statement: "A category akasha decided is held against the category arriving from Monarch.",
    },
    {
      invariantKind: "departure",
      statement: "That comparison is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A category arriving from Monarch is marked as having arrived from Monarch.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own identity is kept when its line is rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "An Amazon order number already held is carried across a resync.",
    },
    {
      invariantKind: "departure",
      statement: "A patch naming a transaction no sidecar has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refused patch writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A month whose lines are unchanged is not rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "These bodies are composed by a program rather than authored.",
    },
    {
      invariantKind: "departure",
      statement:
        "The change adding a file not there already lands each month rather than an edit composed here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The landing is made from inside akasha rather than through anything outside akasha.",
    },
    {
      invariantKind: "absence",
      statement:
        "No key is read through `text-at` here, because `raw` indexes a value nested in the row.",
    },
    {
      invariantKind: "departure",
      statement:
        "`raw` reads a row's nested value, guards that value is an object, then indexes it.",
    },
  ],
} as const satisfies Module
