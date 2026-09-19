import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHereComesTheSun = {
  id: "01a0ba5d-4077-782c-82d9-d8dac361304d",
  type: "page-type/song",
  slug: "coldplay-here-comes-the-sun",
  partOfCollections: ["artist/james-taylor"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8549de8e-f65b-3e64-b8a2-08c90cc5fdd1",
      externalLink: "https://musicbrainz.org/work/8549de8e-f65b-3e64-b8a2-08c90cc5fdd1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Here Comes the Sun",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
