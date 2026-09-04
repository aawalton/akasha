import type { Song } from "../../song.page-type.ts"

export const arianaGrandePiano = {
  id: "019ea4e8-4190-7546-94f5-7031b2c1169c",
  pageTypeSlug: "song",
  slug: "ariana-grande-piano",
  title: "Piano",
  artistSlug: "ariana-grande",
  externalId: "efc1df0c-9a48-43f6-9415-c08af6ef4f7b",
  externalLink: "https://musicbrainz.org/work/efc1df0c-9a48-43f6-9415-c08af6ef4f7b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
