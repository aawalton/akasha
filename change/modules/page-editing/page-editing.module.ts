import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageEditing = {
  id: "01a0bd42-8e07-7b55-a4c1-2f9d6e3708ab",
  type: "page-type/module",
  slug: "page-editing",
  definition: "the change that writes a page composed from a caller's values",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller writing a page composes that page and hands the body to one change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page that will not compose throws, because no caller here can go on without it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
