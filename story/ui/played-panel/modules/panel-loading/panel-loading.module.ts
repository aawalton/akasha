import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelLoading = {
  id: "01a0c4ae-6e13-7017-99e9-d00c28c4c3f3",
  type: "page-type/module",
  slug: "panel-loading",
  definition: "the panels a game names, fetched as code and made ready to be shown",
  code: "ts",
  test: "ts",
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
      statement:
        "A panel reaching a module or a name this build does not offer is left out, and the rest drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Loading the panels never leaves a rejection unhandled; a load that fails draws none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load that fails and a question the store refuses are reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panels come back in the order of their positions, not the order the game names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is bundled with the app, so a new panel needs no deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen can tell panels not loaded yet from panels loaded as none.",
    },
  ],
} as const satisfies Module
