import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTwilightZone = {
  id: "019ea4e8-320d-78cc-a7df-1674cc00d642",
  pageTypeSlug: "song",
  slug: "ariana-grande-twilight-zone",
  title: "twilight zone",
  artistSlug: "ariana-grande",
  externalId: "eded856f-03ba-4df3-a56a-2b9715617be6",
  externalLink: "https://musicbrainz.org/work/eded856f-03ba-4df3-a56a-2b9715617be6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
