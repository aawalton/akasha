import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraLearningToBreathe = {
  id: "019ea4a7-81e3-7a95-bdb5-4d3fc9ca9d8d",
  type: "page-type/song",
  slug: "aurora-learning-to-breathe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eecac4c4-562e-46fa-8762-96d58b929dc4",
      externalLink: "https://musicbrainz.org/work/eecac4c4-562e-46fa-8762-96d58b929dc4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Learning to Breathe",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
