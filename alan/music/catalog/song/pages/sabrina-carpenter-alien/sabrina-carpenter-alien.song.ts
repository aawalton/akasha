import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterAlien = {
  id: "01a0b723-ca59-7571-99fe-988454f10515",
  type: "page-type/song",
  slug: "sabrina-carpenter-alien",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "99bff489-e47b-4f7a-9a54-a90098961fac",
      externalLink: "https://musicbrainz.org/work/99bff489-e47b-4f7a-9a54-a90098961fac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Alien",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
