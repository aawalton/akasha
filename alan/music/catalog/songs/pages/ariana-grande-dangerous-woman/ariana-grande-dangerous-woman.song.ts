import type { Song } from "../../song.page-type.ts"

export const arianaGrandeDangerousWoman = {
  id: "019ea4e2-9096-7b29-93d6-f477489fe4a5",
  pageTypeSlug: "song",
  slug: "ariana-grande-dangerous-woman",
  title: "Dangerous Woman",
  artistSlug: "ariana-grande",
  externalId: "abb0e248-2ba3-4994-9e71-f0c8d5797eb1",
  externalLink: "https://musicbrainz.org/work/abb0e248-2ba3-4994-9e71-f0c8d5797eb1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
