import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeMoving = {
  id: "01a09467-62d1-7e1e-b24d-b6186ad6cf98",
  type: "page-type/module",
  slug: "code-moving",
  definition: "whether the tree a run's code came out of has moved since that run started",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree is a plain export with no git directory, so the stamp there says where it sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a tree sits at is the one the stamp at the root of that tree holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading that commit is one read of one small file rather than a run of git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp holds the commit itself, so nothing is followed anywhere to read it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit no file gives back is no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tree a run came out of is read off the path this module itself was loaded from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run loaded from outside every tree came out of no tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code that came out of no tree has moved for nothing any tree does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a run started at is taken as this module is first imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run leaves on the one exit every long-running unit is written to start again for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run says on the way out the commit it started at and the commit it is leaving for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rules on whether the point this is called at is safe.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits, and nothing here does a unit of work.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs git.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the stamp, which the deploy pinning that tree writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks systemd anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a kind of tree.",
    },
  ],
} as const satisfies Module
