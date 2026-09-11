import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const localPositionPort = {
  id: "01a05c40-2193-7945-bf9f-7515d092af9d",
  type: "module",
  slug: "local-position-port",
  definition: "has the registered async reader of a page's locally stored position.",
  code: "ts",
} as const satisfies Module
