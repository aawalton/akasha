import type { Module } from "@akasha/code/module"

export const tsClientPageAccess = {
  id: "01a0817e-31b2-721b-bc64-08fdaa4920f7",
  pageTypeSlug: "module",
  slug: "ts-client-page-access",
  definition: "the calls a client module makes to the pages table outside an approved wrapper",
  code: "ts",
} as const satisfies Module
