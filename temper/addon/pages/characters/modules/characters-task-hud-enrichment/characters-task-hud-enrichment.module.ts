import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudEnrichment = {
  id: "01a062ee-f104-7075-aa43-acf135684faa",
  type: "page-type/module",
  slug: "characters-task-hud-enrichment",
  definition: "what a task's completion card is holding now, read out for the rows under that task",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An antiquity task's progress is the leads dug this session out of those dug and those left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An antiquity task's zones are in the order of their names, and each zone's leads are too.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.572Z",
  updatedAt: "2026-10-20T17:25:50.154Z",
} as const satisfies Module
