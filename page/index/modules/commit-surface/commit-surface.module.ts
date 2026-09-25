import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitSurface = {
  id: "01a0cab0-a954-7000-805e-8ab8a807b335",
  type: "page-type/module",
  slug: "commit-surface",
  definition: "the index and the file bodies a commit holds, read as a reading",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is answered over a commit rather than over the files in the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entry files read are the ones the commit holds under the index folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body read at a repository path is the body the commit holds at that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name that is no commit is answered no reading rather than a reading of nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit holding no index folder is answered no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller needing the pages at a commit that gives no reading is answered by a throw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the commit does not hold reads as nothing rather than as trouble.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which children of a folder are folders is read from what the commit records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry file, a listing and a body are each held once for the reading asking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trees a commit holds are read by the reader beneath rather than again here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the checkout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The commit is named by the caller asking.",
    },
  ],
} as const satisfies Module
