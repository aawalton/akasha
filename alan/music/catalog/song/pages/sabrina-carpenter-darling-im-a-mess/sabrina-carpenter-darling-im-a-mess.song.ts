import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDarlingImAMess = {
  id: "01a0b723-c65a-7c6a-a7db-ab8617fa060a",
  type: "page-type/song",
  slug: "sabrina-carpenter-darling-im-a-mess",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63c04b9c-5ad3-481f-a511-f422b26405fa",
      externalLink: "https://musicbrainz.org/work/63c04b9c-5ad3-481f-a511-f422b26405fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Darling I’m a Mess",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
