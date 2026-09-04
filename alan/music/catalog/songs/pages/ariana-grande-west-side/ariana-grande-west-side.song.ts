import type { Song } from "../../song.page-type.ts"

export const arianaGrandeWestSide = {
  id: "019ea4e4-c7a3-740e-a4f2-56dbd41773f9",
  pageTypeSlug: "song",
  slug: "ariana-grande-west-side",
  title: "west side",
  artistSlug: "ariana-grande",
  externalId: "4184f032-f0d1-4524-81be-da52c65006d4",
  externalLink: "https://musicbrainz.org/work/4184f032-f0d1-4524-81be-da52c65006d4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
