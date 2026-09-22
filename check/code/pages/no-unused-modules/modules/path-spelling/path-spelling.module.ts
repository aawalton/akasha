import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pathSpelling = {
  id: "01a0c67b-8494-7000-8c19-63ef540669b0",
  type: "page-type/module",
  slug: "path-spelling",
  definition: "which modules a file outside TypeScript names by path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file outside TypeScript names a module by naming a file of that module by path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is named where a body holds that path whole rather than in pieces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A settings file, a manifest, a script and a container recipe are what is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body spelled uncommitted is left unread, recording a run rather than driving one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A built body is left unread, lest one left over from an older build keep a dead module alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note written for a reader is left unread, naming a path for the eye alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module's own files name that module for its page rather than for a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is searched once for every path asked after rather than once for each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a body the search named is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run asking after no module searches nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the index.",
    },
  ],
} as const satisfies Module
