import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e05 = {
  id: "01a18849-3527-765a-b95b-a8c3fa07d623",
  type: "page-type/episode",
  slug: "good-witch-s01e05",
  description:
    "Cassie's magic can't keep her away from Abigail's scheming when the truth becomes too hard to hide and Abigail continues to stir the pot in Middleton.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 5,
  publishedAt: "2015-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1048137",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/5",
    },
  ],
  title: "The Truth About Lies",
  episodeType: "standard",
  stillPath: "/jlSieGaL40wq02FUU7UUpFhnoIt.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
