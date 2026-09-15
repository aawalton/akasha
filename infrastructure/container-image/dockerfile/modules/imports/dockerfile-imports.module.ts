import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileImports = {
  id: "01a06865-abff-7004-9336-61c7231edee3",
  type: "page-type/module",
  slug: "dockerfile-imports",
  definition: "the folders a service's entry files actually reach by import",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach the root package answers is a path under the checkout root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image carries the folder holding a reached file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder under another folder answered is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service's own folder is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach landing on no file is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The graph answers what a service's entry files reach.",
    },
  ],
} as const satisfies Module
