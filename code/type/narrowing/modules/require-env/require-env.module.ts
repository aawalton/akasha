import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requireEnv = {
  id: "01a05c94-2c00-7702-bb18-010545bdfe3e",
  type: "page-type/module",
  slug: "require-env",
  definition: "the environment variable under a name, refused where it is unset",
  code: "ts",
  test: "ts",
} as const satisfies Module
