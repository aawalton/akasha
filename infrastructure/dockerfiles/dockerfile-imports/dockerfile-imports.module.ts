import type { Module } from "@akasha/code-system/module"

export const dockerfileImports = {
  id: "01a06865-abff-7004-9336-61c7231edee3",
  pageTypeSlug: "module",
  slug: "dockerfile-imports",
  definition: "the workspace packages a service's entry files actually reach by import",
  code: "ts",
} as const satisfies Module
