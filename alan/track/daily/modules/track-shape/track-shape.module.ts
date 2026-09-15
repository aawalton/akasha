import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackShape = {
  id: "01a069d7-ba37-75fb-8dbd-6f5be522dda9",
  type: "module",
  slug: "track-shape",
  definition: "the names a day page and its two entry sidecars are filed under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's two jsonl sidecars become entry properties beside the day page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's page type key names the page type this module states.",
    },
  ],
} as const satisfies Module
