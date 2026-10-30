import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const syncedLyrics = {
  id: "01a06243-144b-700d-853d-d8f519a6ff09",
  type: "page-type/file-property",
  slug: "synced-lyrics",
  propertySlug: "synced-lyrics",
  definition: "the words of a song with the time each line is sung at",
  extensions: ["txt"],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:51:21.661Z",
} as const satisfies FileProperty
