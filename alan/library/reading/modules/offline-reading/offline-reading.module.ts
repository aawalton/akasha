import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const offlineReading = {
  id: "01a0657b-06ac-7293-a09b-01ff92f25730",
  type: "module",
  slug: "offline-reading",
  definition: "the chapters carried onto a device",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The page store refuses every keyed write.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a chapter is asked for are exported apart from the fetch.",
    },
    {
      invariantKind: "departure",
      statement: "The page shaped from those keys is exported apart from the fetch.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a completion or a position back.",
    },
    {
      invariantKind: "departure",
      statement: "Chapters keep arriving on the device though nothing is written back.",
    },
    {
      invariantKind: "gap",
      statement: "A chapter Alan finished reads as finished.",
    },
    {
      invariantKind: "gap",
      statement: "A scroll position carried back is kept.",
    },
  ],
} as const satisfies Module
