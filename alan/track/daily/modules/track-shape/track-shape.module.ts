import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackShape = {
  id: "01a069d7-ba37-75fb-8dbd-6f5be522dda9",
  type: "page-type/module",
  slug: "track-shape",
  definition: "the page type key a day page is filed under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's page type key names the page type this module states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names what a day keeps beside its page.",
    },
  ],
} as const satisfies Module
