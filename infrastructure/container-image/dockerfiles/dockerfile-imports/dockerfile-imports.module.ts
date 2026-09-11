import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const dockerfileImports = {
  id: "01a06865-abff-7004-9336-61c7231edee3",
  type: "module",
  slug: "dockerfile-imports",
  definition: "the folders a service's entry files actually reach by import",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reach the root package answers is a path under the checkout root.",
    },
    {
      invariantKind: "departure",
      statement: "The image carries the folder holding a reached file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder under another folder answered is left out.",
    },
    {
      invariantKind: "departure",
      statement: "The service's own folder is left out.",
    },
    {
      invariantKind: "constraint",
      statement: "A reach that lands on no file refuses.",
    },
  ],
} as const satisfies Module
