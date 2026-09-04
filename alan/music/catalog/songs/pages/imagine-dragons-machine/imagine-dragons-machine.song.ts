import type { Song } from "../../song.page-type.ts"

export const imagineDragonsMachine = {
  id: "019ea49a-0127-7f20-8d66-ea0869e6ce3c",
  pageTypeSlug: "song",
  slug: "imagine-dragons-machine",
  title: "Machine",
  artistSlug: "imagine-dragons",
  externalId: "af45bef6-85bf-4a41-b169-a8a1fc6dcaf5",
  externalLink: "https://musicbrainz.org/work/af45bef6-85bf-4a41-b169-a8a1fc6dcaf5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
