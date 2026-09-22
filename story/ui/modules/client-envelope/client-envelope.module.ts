import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clientEnvelope = {
  id: "01a0628e-a5da-73a4-b9b1-51a95f732859",
  type: "page-type/module",
  slug: "client-envelope",
  definition: "the shapes of a game session's payload and of the props a game display takes",
  code: "ts",
} as const satisfies Module
