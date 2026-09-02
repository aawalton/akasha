import type { FileProperty } from "@akasha/pages-system/file-property"

export type SyncedLyrics = "txt"

export const syncedLyrics = {
  id: "01a06243-144b-700d-853d-d8f519a6ff09",
  pageTypeSlug: "file-property",
  slug: "synced-lyrics",
  propertySlug: "synced-lyrics",
  definition: "the words of a song, each line stamped with the moment it is sung",
} as const satisfies FileProperty
