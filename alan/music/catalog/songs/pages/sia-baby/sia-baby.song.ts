import type { Song } from "../../song.page-type.ts"

export const siaBaby = {
  id: "019ea4c6-33ff-70f3-9b40-258278a44214",
  pageTypeSlug: "song",
  slug: "sia-baby",
  title: "Baby",
  artistSlug: "sia",
  externalId: "dca7a6d5-c24d-4206-aab4-24c3569cae98",
  externalLink: "https://musicbrainz.org/work/dca7a6d5-c24d-4206-aab4-24c3569cae98",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
