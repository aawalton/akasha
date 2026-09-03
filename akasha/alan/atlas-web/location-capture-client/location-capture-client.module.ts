import type { Module } from "@akasha/code-system/module"

export const locationCaptureClient = {
  id: "01a06582-6b30-7bd3-9a85-c6ccf0abc52e",
  pageTypeSlug: "module",
  slug: "location-capture-client",
  definition: "the background location capture the phone runs and flushes to the ingest route",
  code: "ts",
} as const satisfies Module
