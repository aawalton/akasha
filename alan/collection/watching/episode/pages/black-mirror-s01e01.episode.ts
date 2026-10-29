import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS01e01 = {
  id: "01a18843-982a-7761-9cc8-80991564c988",
  type: "page-type/episode",
  slug: "black-mirror-s01e01",
  description:
    "Prime Minister Michael Callow faces a shocking dilemma when Princess Susannah, a much-loved member of the Royal Family, is kidnapped.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-1"],
  position: 1,
  publishedAt: "2011-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877838",
      externalLink: "https://www.themoviedb.org/tv/42009/season/1/episode/1",
    },
  ],
  title: "The National Anthem",
  episodeType: "standard",
  stillPath: "/9w27Lgeq8KVxhz4ysygT6ranxf1.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
