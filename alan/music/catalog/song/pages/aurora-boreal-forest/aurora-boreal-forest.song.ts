import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBorealForest = {
  id: "019ea4a7-310a-7d67-aa5b-51829e54740e",
  type: "song",
  slug: "aurora-boreal-forest",
  title: "Boreal Forest",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3ba201f-079c-4f50-8e74-6fcecc524fe6",
      externalLink: "https://musicbrainz.org/work/d3ba201f-079c-4f50-8e74-6fcecc524fe6",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
