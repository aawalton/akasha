import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e07 = {
  id: "01a18849-3527-7278-8771-404cc5a73846",
  type: "page-type/episode",
  slug: "good-witch-s01e07",
  description:
    "A storm continues to threaten the lives of the people in Middleton and Cassie and Sam work together to help.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 7,
  publishedAt: "2015-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1050308",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/7",
    },
  ],
  title: "Together We Stand...",
  episodeType: "standard",
  stillPath: "/mWWC73xjb96GN33OaAd4uPUl8AK.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
