import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsAppId = {
  id: "01a0c537-ba7c-7f31-91cc-ab84e1c7e17d",
  type: "page-type/module",
  slug: "requests-app-id",
  definition: "the Requests site's id and the app page a nav item names",
  code: "ts",
} as const satisfies Module
