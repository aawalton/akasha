import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entryDeclaring = {
  id: "01a0c684-f0a7-7c17-8b46-40e831684c53",
  type: "page-type/module",
  slug: "entry-declaring",
  definition: "which modules declare themselves an entry point",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module run by hand declares itself an entry point in its own code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body opening on a shebang line declares an entry point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming import.meta.main declares an entry point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module's code files are what is read, its page and its test declaring no program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code file spelled uncommitted is left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module is read only until one file of it declares an entry point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run asking after no module reads nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the index.",
    },
  ],
} as const satisfies Module
