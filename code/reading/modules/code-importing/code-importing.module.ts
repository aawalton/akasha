import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeImporting = {
  id: "01a0a320-782d-7fad-b1c1-54479f994857",
  type: "page-type/module",
  slug: "code-importing",
  definition: "the paths inside the repository a TypeScript body imports",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative specifier imports the path that specifier reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier naming a package imports where the naming handed in says.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A specifier the naming handed in does not resolve imports nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A specifier landing outside the repository imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type-only import is an import like any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is answered whether or not the file that path names is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Paths are answered in the order the specifiers are written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a body imports is answered here rather than worked out by a caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import says whether that import names a type or names code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import says whether that import is read as the file loads or only later.",
    },
  ],
} as const satisfies Module
