import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e12 = {
  id: "01a183d4-acc5-74c4-8cd4-77bbfbaecf78",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e12",
  description:
    "After All Might and All For One’s fight, the students go back home while the U.A. teachers decide how to deal with the aftermath.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 12,
  publishedAt: "2018-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448449",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/12",
    },
  ],
  title: "End of the Beginning, Beginning of the End",
  episodeType: "standard",
  stillPath: "/yleKjvyD5DXUnRKjbvOxJCPAhWG.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
