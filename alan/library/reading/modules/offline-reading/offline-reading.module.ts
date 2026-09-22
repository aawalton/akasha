import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const offlineReading = {
  id: "01a0657b-06ac-7293-a09b-01ff92f25730",
  type: "page-type/module",
  slug: "offline-reading",
  definition: "the chapters carried onto a device",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The page store refuses every keyed write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys a chapter is asked for are exported apart from the fetch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page shaped from those keys is exported apart from the fetch.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a completion or a position back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chapters keep arriving on the device though nothing is written back.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A chapter Alan finished is taken as finished.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A scroll position carried back is kept.",
    },
  ],
} as const satisfies Module
