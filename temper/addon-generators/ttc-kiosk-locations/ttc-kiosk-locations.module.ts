import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const ttcKioskLocations = {
  id: "01a0607c-1796-79ab-ba8d-74b841858116",
  pageTypeSlug: "module",
  type: "module",
  slug: "ttc-kiosk-locations",
  definition: "the ttc guild kiosk locations data file, rendered from pages",
  code: "ts",
} as const satisfies Module
