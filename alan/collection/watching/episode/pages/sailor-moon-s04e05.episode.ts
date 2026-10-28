import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS04e05 = {
  id: "01a183d8-4897-7b48-9a2b-67f477d5f60d",
  type: "page-type/episode",
  slug: "sailor-moon-s04e05",
  description:
    "Chibiusa worries that Saori, a friend of Mamoru's from college, is romantically interested in him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-4"],
  position: 5,
  publishedAt: "1995-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992472",
      externalLink: "https://www.themoviedb.org/tv/3570/season/4/episode/5",
    },
  ],
  title: "The Perfect Couple",
  episodeType: "standard",
  stillPath: "/oGgShNXJNsFPZAGMHXj4MJHPQSz.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
