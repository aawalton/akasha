import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTakinItToTheStreets = {
  id: "01a0b72f-4c3a-730d-9688-c7b134617f98",
  type: "page-type/song",
  slug: "james-taylor-takin-it-to-the-streets",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "52c4c857-39f7-3799-b78f-1d9ae9b52f62",
      externalLink: "https://musicbrainz.org/work/52c4c857-39f7-3799-b78f-1d9ae9b52f62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Takin’ It to the Streets",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
