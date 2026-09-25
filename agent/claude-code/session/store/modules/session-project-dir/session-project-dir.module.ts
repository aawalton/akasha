import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sessionProjectDir = {
  id: "01a0687b-aa7d-7000-a7a2-9bee35d924ec",
  type: "page-type/module",
  slug: "session-project-dir",
  definition: "the folder for a Claude Code session's file",
  code: "ts",
  test: "ts",
} as const satisfies Module
