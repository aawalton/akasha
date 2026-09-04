import type { Song } from "../../song.page-type.ts"

export const kellyClarksonImpossible = {
  id: "019ea4ae-721e-7a1c-b9a3-2cf2e33ec96e",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-impossible",
  title: "Impossible",
  artistSlug: "kelly-clarkson",
  externalId: "57674686-c367-3949-ad92-ed4f34bd2b77",
  externalLink: "https://musicbrainz.org/work/57674686-c367-3949-ad92-ed4f34bd2b77",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
