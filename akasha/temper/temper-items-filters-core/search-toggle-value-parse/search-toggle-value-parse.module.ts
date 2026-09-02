import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchToggleValueParse = {
  id: "01a0613a-e0b0-794d-988b-86cd2476f0a7",
  pageTypeSlug: "module",
  slug: "search-toggle-value-parse",
  definition:
    "an include-or-exclude toggle value read out of whatever a saved search or an editor handed in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parser answers undefined where the value is not include and is not exclude.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every toggle filter in the package reads a toggle value through the one shared module.",
    },
  ],
} as const satisfies Module
