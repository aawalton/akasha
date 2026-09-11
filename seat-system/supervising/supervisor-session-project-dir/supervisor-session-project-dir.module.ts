import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorSessionProjectDir = {
  id: "01a0687b-aa7d-7000-a7a2-9bee35d924ec",
  type: "module",
  slug: "supervisor-session-project-dir",
  definition: "the directory claude keeps a session's transcript in",
  code: "ts",
  test: "ts",
} as const satisfies Module
