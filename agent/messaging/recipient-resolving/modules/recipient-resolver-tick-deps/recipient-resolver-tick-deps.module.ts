import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const recipientResolverTickDeps = {
  id: "01a0657d-a75e-7006-9dc7-31683901dbf1",
  type: "module",
  slug: "recipient-resolver-tick-deps",
  definition:
    "the shape of a tick's effects, the row a seat resolves to, and the timeout each takes",
  code: "ts",
} as const satisfies Module
