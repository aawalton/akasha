import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spellingOutliving = {
  id: "01a0c584-8f66-73f6-846d-53c923e47e2a",
  type: "page-type/module",
  slug: "spelling-outliving",
  definition:
    "the files an old name is still written in once a change has repointed what it reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename names every file still spelling the old name and refuses none of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The old name is matched whole, so a longer name holding it is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body weighed is the body the change leaves rather than the body on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a generator writes is left out, a refresh writing that file again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidecar of uncommitted values is left out, its own writer writing it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in more files than the ceiling is counted rather than named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tree is searched once for every name handed in, whatever kind of file holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read once and weighed against every name handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which line an old name is written on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spells an old name anew.",
    },
  ],
} as const satisfies Module
