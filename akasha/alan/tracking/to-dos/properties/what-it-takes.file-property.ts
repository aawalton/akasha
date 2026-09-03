import type { FileProperty } from "@akasha/pages-system/file-property"

export type WhatItTakes = "txt"

export const whatItTakes = {
  id: "01a065a1-49b7-7e29-9dd6-c7707a980840",
  pageTypeSlug: "file-property",
  slug: "what-it-takes",
  propertySlug: "what-it-takes",
  definition: "what doing a to-do takes",
} as const satisfies FileProperty
