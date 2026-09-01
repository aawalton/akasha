import type { Module } from "@akasha/code-system/module"

export const dropZones = {
  id: "01a05c3b-4fc4-74ef-baca-5dc0459014b9",
  pageTypeSlug: "module",
  slug: "drop-zones",
  definition: "Picks a before/after/nest drop target from item rects and pointer Y.",
  code: "ts",
} as const satisfies Module
