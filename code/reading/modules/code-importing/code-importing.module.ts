import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeImporting = {
  id: "01a0a320-782d-7fad-b1c1-54479f994857",
  type: "module",
  slug: "code-importing",
  definition: "the paths inside the repository a TypeScript body imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relative specifier imports the path that specifier reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package imports where the naming handed in says.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier the naming handed in does not resolve imports nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier landing outside the repository imports nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A type-only import is an import like any other.",
    },
    {
      invariantKind: "departure",
      statement: "A path is answered whether or not the file that path names is there.",
    },
    {
      invariantKind: "departure",
      statement: "Paths are answered in the order the specifiers are written.",
    },
    {
      invariantKind: "departure",
      statement: "What a body imports is answered here rather than worked out by a caller.",
    },
  ],
} as const satisfies Module
