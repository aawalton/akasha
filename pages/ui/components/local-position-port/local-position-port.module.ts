import type { Module } from "@akasha/code-system/module"

export const localPositionPort = {
  id: "01a05c40-2193-7945-bf9f-7515d092af9d",
  pageTypeSlug: "module",
  slug: "local-position-port",
  definition: "Holds the registered async reader of a page's locally stored position.",
  code: "ts",
} as const satisfies Module
