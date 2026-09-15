import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const initiativeSeatName = {
  id: "01a0a5b3-3d06-776e-aea8-407ef8b05e0a",
  type: "module",
  slug: "initiative-seat-name",
  definition: "the name of the seat an initiative goes to, read off that initiative's slug",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat an initiative goes to is named by the initiative's first segment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative of one segment names the seat of that whole slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hyphen parts the first segment from the rest.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a seat or an initiative.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says whether that seat is there.",
    },
  ],
} as const satisfies Module
