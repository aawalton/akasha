import type { Module } from "@akasha/code-system/module"

export const turnEndPrompt = {
  id: "01a069c7-5c5f-75c4-bb66-9416a01117a8",
  pageTypeSlug: "module",
  slug: "turn-end-prompt",
  definition: "the one question a turn end is put to a model as, and its answer read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mechanical fact is said as what it is rather than as what it means.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is not one JSON object is read as no answer.",
    },
  ],
} as const satisfies Module
