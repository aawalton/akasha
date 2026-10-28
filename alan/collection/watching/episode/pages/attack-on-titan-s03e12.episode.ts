import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e12 = {
  id: "01a183d1-6a25-79b2-933b-64fff434825b",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e12",
  description:
    "The Scouts gather for a feisty feast before leaving to retake Wall Maria to uncover what's hidden in the basement once and for all.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 12,
  publishedAt: "2018-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1595000",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/12",
    },
  ],
  title: "Night of the Battle to Retake the Wall",
  episodeType: "mid-season",
  stillPath: "/aFmPdWGTXXRQun2yQzS9ojX3yzC.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
