import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sessionEnvelope = {
  id: "01a0628e-a5db-798a-bf9f-8f522487f7b9",
  type: "page-type/module",
  slug: "session-envelope",
  definition: "a session's payload put together from state, story and the actions still pending",
  code: "ts",
  test: "ts",
} as const satisfies Module
