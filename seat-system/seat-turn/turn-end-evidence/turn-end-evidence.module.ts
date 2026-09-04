import type { Module } from "@akasha/code-system/module"

export const turnEndEvidence = {
  id: "01a069c7-5c5f-7e4e-8806-73cb7b6c74de",
  pageTypeSlug: "module",
  slug: "turn-end-evidence",
  definition: "the tail of a transcript read into what one ended turn did and said",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn ending in a tool use is no turn end.",
    },
    {
      invariantKind: "departure",
      statement: "Only the tail of a transcript is read.",
    },
  ],
} as const satisfies Module
