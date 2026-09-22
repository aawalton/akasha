import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDebugIndex = {
  id: "01a06275-c447-7da5-abe9-590fd4049dbb",
  type: "page-type/module",
  slug: "scrollable-menu-debug-index",
  definition: "the bare import list covering the logger and its slash-command toggle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The logger is imported before the toggle that switches the logger.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
