import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportTelling = {
  id: "01a0d968-2f19-7192-8c99-bbefbca20bed",
  type: "page-type/module",
  slug: "export-telling",
  definition: "the names a body exports, told apart",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value, a function, a class, a type and an interface each tell their own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value exported as the default tells the name `default`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list exporting only types of the body's own tells each name it exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other list, and any other statement, tells no name apart.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
