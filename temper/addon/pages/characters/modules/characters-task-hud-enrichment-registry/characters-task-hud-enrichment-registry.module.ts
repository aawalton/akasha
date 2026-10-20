import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudEnrichmentRegistry = {
  id: "01a062ee-f116-7076-9ec8-826920a7ed16",
  type: "page-type/module",
  slug: "characters-task-hud-enrichment-registry",
  definition: "which extra rows a task gets under it, and how each of those rows is spelled",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An antiquity whose lead is easy to get says how after its name, in the game's hint color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ways are scry, buy map, and dig the antiquity whose dig rewards this one's lead first.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.590Z",
  updatedAt: "2026-10-20T18:28:43.814Z",
} as const satisfies Module
