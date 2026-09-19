import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWife = {
  id: "01a0b723-d230-77fd-97ee-1718e6b8de11",
  type: "page-type/song",
  slug: "sabrina-carpenter-wife",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35f8a68c-f4c3-4c6b-8677-78be5667ab72",
      externalLink: "https://musicbrainz.org/work/35f8a68c-f4c3-4c6b-8677-78be5667ab72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "wife",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
} as const satisfies Song
