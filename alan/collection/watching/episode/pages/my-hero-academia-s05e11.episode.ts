import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e11 = {
  id: "01a183d4-acc8-771c-8eac-afd90297abf1",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e11",
  description:
    "It's an all-out brawl as the last two teams from Class A and Class B fight it out to the finish!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 11,
  publishedAt: "2021-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2817771",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/11",
    },
  ],
  title: "Our Brawl",
  episodeType: "standard",
  stillPath: "/7HQygLub7hpm5z0hPUgfnwfbKj.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
