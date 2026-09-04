import type { Module } from "../../code-system/modules/module.page-type.ts"

export const handleInbound = {
  id: "01a05b6f-999d-7cde-afd6-ca387a8bb110",
  pageTypeSlug: "module",
  slug: "handle-inbound",
  definition: "one inbound webhook carried from its signature to the seat that receives it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is parsed only after its signature holds.",
    },
    {
      invariantKind: "departure",
      statement: "A signature that does not hold answers 403.",
    },
    {
      invariantKind: "departure",
      statement: "A body the shape refuses answers 400.",
    },
    {
      invariantKind: "departure",
      statement: "An event that is not a received message is ignored rather than turned away.",
    },
    {
      invariantKind: "departure",
      statement: "A message no seat accepts becomes a refusal notice to Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal notice that fails to land is named in the outcome.",
    },
    {
      invariantKind: "departure",
      statement: "A discard nobody could record is still answered as a discard.",
    },
  ],
} as const satisfies Module
