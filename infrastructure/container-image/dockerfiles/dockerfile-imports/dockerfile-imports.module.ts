import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dockerfileImports = {
  id: "01a06865-abff-7004-9336-61c7231edee3",
  pageTypeSlug: "module",
  type: "module",
  slug: "dockerfile-imports",
  definition: "the folders a service's entry files actually reach by import",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reach the root package answers is a path under the checkout root.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holding a reached file is what the image carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder under another folder answered is left out, since the wider one holds it.",
    },
    {
      invariantKind: "departure",
      statement: "The service's own folder is left out, being copied on its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A reach that lands on no file refuses, rather than being left out in silence.",
    },
  ],
} as const satisfies Module
