import type { Song } from "../../song.page-type.ts"

export const arianaGrandeIntoYou = {
  id: "019ea4e3-3f98-7e7f-bf87-aede016d822f",
  pageTypeSlug: "song",
  slug: "ariana-grande-into-you",
  title: "Into You",
  artistSlug: "ariana-grande",
  externalId: "d176eb30-6412-4612-b3c7-e0012393ab65",
  externalLink: "https://musicbrainz.org/work/d176eb30-6412-4612-b3c7-e0012393ab65",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
