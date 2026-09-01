import type { Module } from "@akasha/code-system/module"

export const storeReaching = {
  id: "01a05aec-eaaa-7fea-bdc1-a5818c78d54a",
  pageTypeSlug: "module",
  slug: "store-reaching",
  definition: "where the page store stands, and the POST that carries a body to it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The origin is read from the environment before anything else.",
    },
    {
      invariantKind: "departure",
      statement: "A browser reaches the store under its own origin.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may put its own fetcher in place of the global one.",
    },
    {
      invariantKind: "departure",
      statement: "A call that answers nothing is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal the store states is carried into the reason given back.",
    },
    {
      invariantKind: "departure",
      statement: "A call the store refuses for its own reasons is not tried again.",
    },
    {
      invariantKind: "departure",
      statement: "A reason names how many attempts were spent.",
    },
    {
      invariantKind: "departure",
      statement: "A reason says nothing came back only where nothing did.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a question or a write is made of.",
    },
  ],
} as const satisfies Module
