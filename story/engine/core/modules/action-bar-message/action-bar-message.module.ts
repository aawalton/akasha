import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarMessage = {
  id: "01a05b71-e542-79f6-8369-4b9b67355af8",
  type: "page-type/module",
  slug: "action-bar-message",
  definition: "whether a player's typed line is an act in the fiction or a note out of it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The action bar is played by Alan alone, and sends under a name made from his.",
    },
  ],
} as const satisfies Module
