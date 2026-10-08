import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLoveTheOneYoureWith = {
  id: "01a0b72f-3fc3-7ddf-8ec1-f572b4583c82",
  type: "page-type/song",
  slug: "james-taylor-love-the-one-youre-with",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bddff2ea-4853-33ad-864a-2c37d8848826",
      externalLink: "https://musicbrainz.org/work/bddff2ea-4853-33ad-864a-2c37d8848826",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love the One You’re With",
  artist: "artist/james-taylor",
  performed: true,
  createdAt: "2026-09-19T01:02:02.179Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
