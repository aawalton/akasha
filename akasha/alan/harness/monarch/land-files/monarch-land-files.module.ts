import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchLandFiles = {
  id: "01a06863-ac0c-7ade-b991-f9f1ddf1dbed",
  pageTypeSlug: "module",
  slug: "monarch-land-files",
  definition:
    "the month pages and their transaction sidecars, composed from Monarch's rows and landed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A month page stands in a folder of its own with its transactions entry file beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line is written in the entry shape's own key order however it was built, so a resync that changes nothing rewrites nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Lines are sorted by day and then by Monarch's id, so the file's order does not depend on the order rows arrived.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category we decided is held against one arriving from Monarch, and holding it is said.",
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
      statement:
        "A patch naming a transaction no sidecar carries is refused, and nothing is written.",
    },
    {
      invariantKind: "departure",
      statement: "A month whose lines are unchanged is not rewritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "These bodies are composed by a program rather than authored, so the landing owes no reading and reads nothing first.",
    },
    {
      invariantKind: "departure",
      statement: "The landing is made from inside akasha rather than through anything outside it.",
    },
  ],
} as const satisfies Module
