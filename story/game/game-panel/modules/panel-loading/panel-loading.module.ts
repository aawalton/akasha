import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelLoading = {
  id: "01a0c4ae-6e13-7017-99e9-d00c28c4c3f3",
  type: "page-type/module",
  slug: "panel-loading",
  definition: "the panels a game names, fetched as code and made ready to be shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is fetched by the address the game names it under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code fetched is what the landing wrote, not what the author wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the app offers is laid out before any panel's code is run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel whose code offers no panel is left out rather than shown empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels come back in the order the game names them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is bundled with the app, so a new panel needs no deploy.",
    },
  ],
} as const satisfies Module
