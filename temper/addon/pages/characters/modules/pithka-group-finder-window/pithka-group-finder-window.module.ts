import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaGroupFinderWindow = {
  id: "01a0de92-1241-72e5-85cb-d718c2ab2468",
  type: "page-type/module",
  slug: "pithka-group-finder-window",
  definition: "the group finder window's listing cards, search buttons and searching line",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is framed by the shared window frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The searching line is one line inside the footer, ending in an ellipsis where long.",
    },
  ],
  createdAt: "2026-09-26T16:35:10.017Z",
  updatedAt: "2026-10-18T20:08:18.328Z",
} as const satisfies Module
