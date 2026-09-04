import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const turnPackageSchema = {
  id: "01a05b71-e544-73e0-82ca-7eee60b403bb",
  pageTypeSlug: "module",
  slug: "turn-package-schema",
  definition:
    "what one turn hands back: the player's act, the world's answer, and the pools that moved",
  code: "ts",
} as const satisfies Module
