import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const graphAsking = {
  id: "01a04ff4-320c-7689-9d79-b3b0caa05ab1",
  type: "page-type/module",
  slug: "graph-asking",
  definition: "what the graph is asked, and where each answer is read from",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edge going out is read from the body and an edge coming in from beside the page reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is answered by reading rather than by walking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import edge exists only where the file beside the page imported says so.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No question here names an index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module a page type names as its loader is reached from every page of that type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page body an answer rests on is read through the index handed in rather than off the working tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file body an edge going out is read from comes from the reader handed in rather than from disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One edge is answered here and a closure over the edges is answered elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edges come back in the order they were read rather than sorted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge going out is answered from a step prepared once for many files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The specifiers a body names are read again for every file that step is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge going out is read only from a file TypeScript parses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The folder an index is in is spelled by the indexes rather than here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The repository with the pages is never named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a path belongs to is composed out of that path's own name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A path named by a page type rather than by a page is answered here with no edge at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute an answer writes is named here, and an edge carrying none of it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import edge going out says whether that edge names a type or names code.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An edge coming in says whether that edge names a type or names code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import edge going out says whether that edge is followed as the file loads or later.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An edge coming in says whether that edge is followed as the file loads or later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation edge going out is read from the page's own body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation going out comes back in the order the page names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One reading answers a relation going out and the sidecar naming that relation coming in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A relation a sidecar row states is no edge going out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page reaches the module its page type names as that type's loader.",
    },
  ],
} as const satisfies Module
