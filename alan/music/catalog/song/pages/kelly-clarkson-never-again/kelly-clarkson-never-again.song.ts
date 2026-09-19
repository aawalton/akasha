import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonNeverAgain = {
  id: "019ea4af-904a-797a-998c-4b704aaf1ed5",
  type: "page-type/song",
  slug: "kelly-clarkson-never-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9af4a4d3-3b01-4a01-8d0a-0cb5dcdede8a",
      externalLink: "https://musicbrainz.org/work/9af4a4d3-3b01-4a01-8d0a-0cb5dcdede8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Again",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
