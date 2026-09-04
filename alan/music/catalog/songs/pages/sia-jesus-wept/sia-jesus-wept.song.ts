import type { Song } from "../../song.page-type.ts"

export const siaJesusWept = {
  id: "019ea4c7-e41b-7861-96f4-66e82de82edb",
  pageTypeSlug: "song",
  slug: "sia-jesus-wept",
  title: "Jesus Wept",
  artistSlug: "sia",
  externalId: "5d21ad95-1655-49f3-aca6-a46a09b85a05",
  externalLink: "https://musicbrainz.org/work/5d21ad95-1655-49f3-aca6-a46a09b85a05",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
