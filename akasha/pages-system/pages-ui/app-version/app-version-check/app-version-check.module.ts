import type { Module } from "@akasha/code-system/module"

export const appVersionCheck = {
  id: "01a05c0f-884e-79da-afec-110b19b9fb05",
  pageTypeSlug: "module",
  slug: "app-version-check",
  definition: "whether the build a browser runs is behind the live one, and the url onto it",
  code: "ts",
} as const satisfies Module
