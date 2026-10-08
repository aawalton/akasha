import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBorealForest = {
  id: "019ea4a7-310a-7d67-aa5b-51829e54740e",
  type: "page-type/song",
  slug: "aurora-boreal-forest",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3ba201f-079c-4f50-8e74-6fcecc524fe6",
      externalLink: "https://musicbrainz.org/work/d3ba201f-079c-4f50-8e74-6fcecc524fe6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Boreal Forest",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-06-08T00:34:41.034Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
