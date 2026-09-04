import type { Module } from "@akasha/code-system/module"

export const turnEndConduct = {
  id: "01a069c7-5c5f-7e9e-a220-b1c41e495ca8",
  pageTypeSlug: "module",
  slug: "turn-end-conduct",
  definition: "what annoys a seat's principal, read off its domain page at run time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The conduct is read at run time rather than compiled in.",
    },
    {
      invariantKind: "departure",
      statement: "A conduct that says nothing refuses the reading rather than allowing it.",
    },
  ],
} as const satisfies Module
