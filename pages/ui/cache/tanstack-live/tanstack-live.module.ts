import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const tanstackLive = {
  id: "01a05cba-9cbc-7f0a-9fe4-2beece336d54",
  type: "module",
  slug: "tanstack-live",
  definition: "a live query pipeline acquired by slug and read as it changes",
  code: "ts",
} as const satisfies Module
