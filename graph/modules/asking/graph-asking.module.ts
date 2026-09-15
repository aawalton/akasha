import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const graphAsking = {
  id: "01a04ff4-320c-7689-9d79-b3b0caa05ab1",
  type: "module",
  slug: "graph-asking",
  definition: "what the graph is asked, and where each answer is read from",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An edge going out is read from the body and an edge coming in from beside the page reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question is answered by reading rather than by walking.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import edge exists only where the file beside the page imported says so.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No question here names an index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module a page type names as its loader is reached from every page of that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page body an answer rests on is read through the index handed in rather than off the working tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file body an edge going out is read from comes from the reader handed in rather than from disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One edge is answered here and a closure over the edges is answered elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge going out is answered from a step prepared once for many files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The specifiers a body names are read again for every file that step is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge going out is read only from a file TypeScript parses.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The folder an index is in is spelled by the indexes rather than here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The repository with the pages is never named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a path belongs to is composed out of that path's own name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A path named by a page type rather than by a page is answered here with no edge at all.",
    },
  ],
} as const satisfies Module
