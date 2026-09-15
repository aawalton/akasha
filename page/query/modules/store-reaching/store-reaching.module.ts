import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storeReaching = {
  id: "01a05aec-eaaa-7fea-bdc1-a5818c78d54a",
  type: "module",
  slug: "store-reaching",
  definition: "where the page store stands, and the POST that carries a body to it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The origin is read from the environment before anything else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browser reaches the store under its own origin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller hands its own fetcher in rather than putting one in place of the global fetcher.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that answers nothing is tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal the store states is carried into the reason given back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call the store refuses for its own reasons is not tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason names how many attempts were spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason says nothing came back only where nothing did.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the parts a question or a write holds.",
    },
  ],
} as const satisfies Module
