import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const jsonbOps = {
  id: "01a05b92-a9c7-75cf-8c6e-e71a10fbd2df",
  type: "module",
  slug: "jsonb-ops",
  definition: "a json value edited at a path the way postgres's jsonb operators do",
  code: "ts",
} as const satisfies Module
