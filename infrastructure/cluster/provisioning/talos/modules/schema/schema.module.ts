import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const schema = {
  id: "01a06813-7b0f-7bbe-925e-eaf7eea6ab02",
  type: "page-type/module",
  slug: "schema",
  definition: "the schemas a Talos node's and a cluster's declared config hold to",
  code: "ts",
} as const satisfies Module
