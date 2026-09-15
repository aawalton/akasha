import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const landingSaying = {
  id: "01a06d77-0d79-7f0a-8ea4-cb8531aeecfb",
  type: "module",
  slug: "landing-saying",
  definition: "the report a landing answers with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every body a landing landed is named in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A body that landed differently from the body handed in is named in the report.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing given no commit message is said as the act and the paths that landing has.",
    },
    {
      invariantKind: "departure",
      statement: "The paths in such a message are sorted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing with more than three paths is said as the act and how many paths landed.",
    },
    {
      invariantKind: "departure",
      statement: "A repair a landing ran to put things back answers with what that repair said.",
    },
    {
      invariantKind: "departure",
      statement: "A repair that went through says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An index left naming what did not land says how to build the index again.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that committed is said as the commit that landing made.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that committed nothing says which of the two reasons it was.",
    },
    {
      invariantKind: "departure",
      statement: "A tree already holding what was asked for is one reason.",
    },
    {
      invariantKind: "departure",
      statement: "Paths the repository ignores being taken away is the other.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that took such a path away names every path it took, sorted.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
  ],
} as const satisfies Module
