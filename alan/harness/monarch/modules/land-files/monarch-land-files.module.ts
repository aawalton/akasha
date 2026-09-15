import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchLandFiles = {
  id: "01a06863-ac0c-7ade-b991-f9f1ddf1dbed",
  type: "module",
  slug: "monarch-land-files",
  definition:
    "the month pages and their transaction sidecars, composed from Monarch's rows and landed",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A month page sits in a folder of its own with its transactions entry file beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is written in the entry shape's own key order however the line was built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are sorted by day and then by Monarch's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category akasha decided is held against the category arriving from Monarch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That comparison is reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category arriving from Monarch is marked as having arrived from Monarch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's own identity is kept when its line is rewritten.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An Amazon order number already held is carried across a resync.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch naming a transaction no sidecar has is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refused patch writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A month whose lines are unchanged is not rewritten.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "These bodies are composed by a program rather than authored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A month page names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The change adding a file not there already lands each month rather than an edit composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The landing is made from inside akasha rather than through anything outside akasha.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "No key is read through `text-at` here, because `raw` indexes a value nested in the row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "`raw` reads a row's nested value, guards that value is an object, then indexes it.",
    },
  ],
} as const satisfies Module
