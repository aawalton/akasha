import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireEnv = {
  id: "01a05c94-2c00-7702-bb18-010545bdfe3e",
  pageTypeSlug: "module",
  slug: "require-env",
  definition: "the environment variable under a name, refused where it is unset",
  code: "ts",
} as const satisfies Module
