import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellMoves = {
  id: "01a0daa1-79b5-75c5-bd83-26c128803c3a",
  type: "page-type/module",
  slug: "shell-moves",
  definition: "the folder a call on a shell line runs in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A `cd`, a `pushd` and a `popd` each move the folder the calls after them run in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative folder is read from the folder the move is made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `cd` naming no folder moves home, and `cd -` moves back to the folder left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move to a folder the line does not spell moves nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absolute path is placed by itself, wherever the call runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path opening with a tilde names the home directory.",
    },
  ],
} as const satisfies Module
