import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWhiteChristmas = {
  id: "01a0b723-d20f-747e-8082-b3e5ea805b94",
  type: "page-type/song",
  slug: "sabrina-carpenter-white-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30daa999-81af-34c3-bf22-b3c1c41c8c01",
      externalLink: "https://musicbrainz.org/work/30daa999-81af-34c3-bf22-b3c1c41c8c01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Christmas",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
