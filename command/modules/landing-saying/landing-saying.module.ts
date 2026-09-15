import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingSaying = {
  id: "01a06d77-0d79-7f0a-8ea4-cb8531aeecfb",
  type: "module",
  slug: "landing-saying",
  definition: "the report a landing answers with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body a landing landed is named in the report.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that landed differently from the body handed in is named in the report.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing given no commit message is said as the act and the paths that landing has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The paths in such a message are sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing with more than three paths is said as the act and how many paths landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repair a landing ran to put things back answers with what that repair said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repair that went through says nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index left naming what did not land says how to build the index again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that committed is said as the commit that landing made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that committed nothing says which of the two reasons it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree already holding what was asked for is one reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Paths the repository ignores being taken away is the other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing that took such a path away names every path it took, sorted.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges.",
    },
  ],
} as const satisfies Module
