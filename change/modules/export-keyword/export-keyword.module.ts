import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportKeyword = {
  id: "01a09b78-e712-7e62-a475-527e244c7146",
  type: "module",
  slug: "export-keyword",
  definition: "the `export` keyword in a body, and the names each one declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A statement is reached only where every name it declares was asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A variable statement declares every name its pattern binds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function and a class each declare the one name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A statement declaring no name at all is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage answered runs from the keyword past the spaces after it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change wanting these names reads them here rather than from another change.",
    },
  ],
} as const satisfies Module
