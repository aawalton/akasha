import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const actionBarMessage = {
  id: "01a05b71-e542-79f6-8369-4b9b67355af8",
  type: "module",
  slug: "action-bar-message",
  definition: "whether a player's typed line is an act in the fiction or a note out of it",
  code: "ts",
  test: "ts",
} as const satisfies Module
