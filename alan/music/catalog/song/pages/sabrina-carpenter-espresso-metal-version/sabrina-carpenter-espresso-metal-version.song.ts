import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterEspressoMetalVersion = {
  id: "01a0b723-c03e-7a0f-9659-a09548f899a8",
  type: "page-type/song",
  slug: "sabrina-carpenter-espresso-metal-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c955d31-0dec-40ad-ac59-99fc9153f2b5",
      externalLink: "https://musicbrainz.org/work/0c955d31-0dec-40ad-ac59-99fc9153f2b5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Espresso (Metal Version)",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
