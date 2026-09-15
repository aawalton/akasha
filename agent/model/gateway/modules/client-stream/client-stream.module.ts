import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clientStream = {
  id: "01a0628b-a005-7127-97c7-0f8541a03fb6",
  type: "page-type/module",
  slug: "client-stream",
  definition: "whether the client asked for the answer as a stream",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request body that is no JSON reads as no stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing request body reads as no stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the JSON boolean `true` under the body's `stream` key reads as a stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `stream` key below the body's top level reads as no stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body key beside `stream` never refuses the parse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here tells a body naming no `stream` from a body that is no JSON.",
    },
  ],
} as const satisfies Module
