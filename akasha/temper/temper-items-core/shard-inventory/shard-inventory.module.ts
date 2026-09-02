import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shardInventory = {
  id: "01a060c5-3c26-79fe-b04c-459d6e56880b",
  pageTypeSlug: "module",
  slug: "shard-inventory",
  definition: "an inventory body divided into chunks small enough to write",
  code: "ts",
} as const satisfies Module
