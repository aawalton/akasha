import type { Song } from "../../song.page-type.ts"

export const taylorSwiftAfterglow = {
  id: "019ea416-1164-73ac-9224-9b8106bba941",
  pageTypeSlug: "song",
  slug: "taylor-swift-afterglow",
  title: "Afterglow",
  artistSlug: "taylor-swift",
  externalId: "ab84673d-bcef-454d-8294-9585d7b7f942",
  externalLink: "https://musicbrainz.org/work/ab84673d-bcef-454d-8294-9585d7b7f942",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
