import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterEspresso = {
  id: "01a0b723-c41a-77cf-bf9e-7b805307905d",
  type: "page-type/song",
  slug: "sabrina-carpenter-espresso",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3df075f7-65b4-401a-ac28-d8113963cd58",
      externalLink: "https://musicbrainz.org/work/3df075f7-65b4-401a-ac28-d8113963cd58",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Espresso",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
