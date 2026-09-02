import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionItemPicker = {
  id: "01a0640c-1e9b-7076-81b6-4ed139595064",
  pageTypeSlug: "module",
  slug: "completion-item-picker",
  definition: "the levels a completion card offers to pick through, and the paths they enumerate",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card is walked to whatever depth its picker keeps answering to.",
    },
    {
      invariantKind: "departure",
      statement: "A picker answering null marks a leaf rather than an absent card.",
    },
    {
      invariantKind: "departure",
      statement: "An account card takes no character completions to pick over.",
    },
    {
      invariantKind: "departure",
      statement: "What a card offers is read off the static catalog rather than off saved data.",
    },
  ],
} as const satisfies Module
