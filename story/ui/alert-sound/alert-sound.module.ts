import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const alertSound = {
  id: "01a0628e-a5da-79f9-befc-8d2ab729acdd",
  pageTypeSlug: "module",
  type: "module",
  slug: "alert-sound",
  definition: "the preset tones a game's alert plays through the browser's audio",
  code: "ts",
} as const satisfies Module
