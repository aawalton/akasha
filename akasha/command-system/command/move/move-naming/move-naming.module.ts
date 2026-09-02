import type { Module } from "@akasha/code-system/module"

export const moveNaming = {
  id: "01a06310-8e44-7798-ae4b-af7b4b182be8",
  pageTypeSlug: "module",
  slug: "move-naming",
  definition: "the tracked files under the akasha folder that name a path a move is carrying",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which page owns a path is answered by the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index answers more than one page to is left unread.",
    },
    {
      invariantKind: "departure",
      statement: "A path no page owns is answered as owned by no page.",
    },
    {
      invariantKind: "departure",
      statement: "What imports a path that moves is answered by the index.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not answer leaves the importers unread.",
    },
    {
      invariantKind: "departure",
      statement: "A file moving in the same act is no importer of what moves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body spelling the last part of a path that moves is answered as naming that path.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies searched are the bodies the commit handed in holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path the caller already knows about is left out of that search.",
    },
    {
      invariantKind: "absence",
      statement: "A path that is no TypeScript file is left out of that search.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
