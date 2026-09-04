import type { Module } from "@akasha/code-system/module"

export const recipientResolverTickDeps = {
  id: "01a0657d-a75e-7006-9dc7-31683901dbf1",
  pageTypeSlug: "module",
  slug: "recipient-resolver-tick-deps",
  definition:
    "the shape of a tick's effects, the row a seat resolves to, and the timeout each takes",
  code: "ts",
} as const satisfies Module
