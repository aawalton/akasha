import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e13 = {
  id: "01a18883-a8af-7455-9af7-d22fed14343d",
  type: "page-type/episode",
  slug: "criminal-minds-s01e13",
  description:
    "The team travels to New Jersey where several people have been poisoned, one of them fatally with LSD, ten times more potent than the street version.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 13,
  publishedAt: "2006-01-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005469",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/13",
    },
  ],
  title: "Poison",
  episodeType: "standard",
  stillPath: "/pSNFElZd8YeL1CkumS994r8xPbj.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
