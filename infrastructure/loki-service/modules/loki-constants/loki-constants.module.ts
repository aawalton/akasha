import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lokiConstants = {
  id: "01a06816-68b1-78e1-906d-cb209f53a78c",
  type: "page-type/module",
  slug: "loki-constants",
  definition: "the namespace, disk and label names every Loki manifest is built from",
  code: "ts",
} as const satisfies Module
