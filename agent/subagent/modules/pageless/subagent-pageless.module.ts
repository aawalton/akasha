import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPageless = {
  id: "01a0951d-933c-768f-a4e9-51a54ceda87a",
  type: "page-type/module",
  slug: "subagent-pageless",
  definition: "a subagent a seat's transcript names as at work with no page of its own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "What is at work is asked of the seat's transcript rather than of the page index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An index cannot answer for a page that is not in it, which is what is looked for.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A compacted transcript names no agent id and so names nothing as at work.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript naming nothing at work is read as no evidence rather than as none.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A subagent whose launch the transcript has not folded yet is named by no agent id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent the transcript names by no agent id is counted rather than named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent dispatched a moment ago is at work with no page until one lands.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page, takes a page away, or reads a transcript itself.",
    },
  ],
} as const satisfies Module
