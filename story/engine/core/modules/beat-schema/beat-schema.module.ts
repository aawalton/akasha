import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatSchema = {
  id: "01a05b71-e543-7506-a57c-cc05b4aa56aa",
  type: "page-type/module",
  slug: "beat-schema",
  definition: "an entry in a game's log, either narrated prose or a system event",
  code: "ts",
  test: "ts",
} as const satisfies Module
