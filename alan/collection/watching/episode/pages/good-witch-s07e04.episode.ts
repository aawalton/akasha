import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e04 = {
  id: "01a18849-352b-7392-8add-7671b7de0a5c",
  type: "page-type/episode",
  slug: "good-witch-s07e04",
  description:
    "Sam is excited to perform surgery on a star basketball player. Joy makes a discovery and decides to revive the Middleton Exchange tradition.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 4,
  publishedAt: "2021-06-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2960249",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/4",
    },
  ],
  title: "The Exchange",
  episodeType: "standard",
  stillPath: "/1ukdWQLkd5sF0y4nE77WXmeL1Bd.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
