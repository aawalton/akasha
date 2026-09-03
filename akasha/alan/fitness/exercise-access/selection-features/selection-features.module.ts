import type { Module } from "@akasha/code-system/module"

export const selectionFeatures = {
  id: "01a06865-c36f-784c-8637-bc936c6354b2",
  pageTypeSlug: "module",
  slug: "selection-features",
  definition:
    "the movement traits selection reads, worked out from a movement's name, muscles and kit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trait is worked out from what the upstream row says rather than asked of Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "A movement pattern named outright stands over the one the name and muscles imply.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stretching movement is a mobility pattern and a cardio movement a conditioning one.",
    },
    {
      invariantKind: "departure",
      statement: "A movement no name or muscle places is an isolation pattern rather than none.",
    },
    {
      invariantKind: "departure",
      statement: "A movement takes a second pattern only where it is named outright.",
    },
    {
      invariantKind: "gap",
      statement: "Every list here is also the values of a select property under fitness.",
    },
  ],
} as const satisfies Module
