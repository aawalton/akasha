import type { Song } from "../../song.page-type.ts"

export const arianaGrandeLovinIt = {
  id: "019ea4e4-14b5-7fda-b0f0-e678e32db3ed",
  pageTypeSlug: "song",
  slug: "ariana-grande-lovin-it",
  title: "Lovin' It",
  artistSlug: "ariana-grande",
  externalId: "0b7b0187-1507-4a4d-9ad3-fc201c0e1c64",
  externalLink: "https://musicbrainz.org/work/0b7b0187-1507-4a4d-9ad3-fc201c0e1c64",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
