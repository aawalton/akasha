import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportKeyword = {
  id: "01a09b78-e712-7e62-a475-527e244c7146",
  type: "page-type/module",
  slug: "export-keyword",
  definition: "the `export` keyword in a body, and the names each one declares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement is reached only where every name it declares was asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A variable statement declares every name its pattern binds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function, a class, a type and an interface each declare the one name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement declaring no name at all is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The passage answered runs from the keyword past the spaces after it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change wanting these names reads them here rather than from another change.",
    },
  ],
} as const satisfies Module
