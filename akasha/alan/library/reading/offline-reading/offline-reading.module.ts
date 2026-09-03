import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const offlineReading = {
  id: "01a0657b-06ac-7293-a09b-01ff92f25730",
  pageTypeSlug: "module",
  slug: "offline-reading",
  definition: "the chapters carried onto a device and the progress carried back",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The page store refuses every keyed write.",
    },
    {
      invariantKind: "departure",
      statement: "Both writers here land through a keyed patch.",
    },
    {
      invariantKind: "departure",
      statement: "Chapters keep arriving on the device though nothing is written back.",
    },
    {
      invariantKind: "departure",
      statement: "A caller of either writer is handed the refusal rather than a silent success.",
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
