import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakAfterLogin = {
  id: "01a06115-1ac2-722c-b197-010a823cbb8f",
  type: "page-type/module",
  slug: "tweak-after-login",
  definition: "what the interface tweaks do once a character is in the world",
  code: "ts",
} as const satisfies Module
