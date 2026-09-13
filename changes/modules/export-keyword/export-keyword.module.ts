import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const exportKeyword = {
  id: "01a09b78-e712-7e62-a475-527e244c7146",
  type: "module",
  slug: "export-keyword",
  definition: "the `export` keyword in a body, and the names each one declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A statement is reached only where every name it declares was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A variable statement declares every name its pattern binds.",
    },
    {
      invariantKind: "departure",
      statement: "A function and a class each declare the one name.",
    },
    {
      invariantKind: "departure",
      statement: "A statement declaring no name at all is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The passage answered runs from the keyword past the spaces after it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A change wanting these names reads them here rather than from another change.",
    },
  ],
} as const satisfies Module
