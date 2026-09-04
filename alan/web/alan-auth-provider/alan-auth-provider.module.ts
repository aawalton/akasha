import type { Module } from "@akasha/code-system/module"

export const alanAuthProvider = {
  id: "01a0655d-dab8-75b5-b6b9-521ef16cadd1",
  pageTypeSlug: "module",
  slug: "alan-auth-provider",
  definition: "the signed-in account held for every component below it",
  code: "tsx",
  test: "tsx",
} as const satisfies Module
