import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e12 = {
  id: "01a183d4-acc3-7cf0-a708-8afaf5e1c262",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e12",
  description:
    "The explosive showdown between Todoroki and Bakugo begins. Only one can take the title of first-year champion!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 12,
  publishedAt: "2017-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329608",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/12",
    },
  ],
  title: "Todoroki vs. Bakugo",
  episodeType: "standard",
  stillPath: "/iEAHq4YEwvW4KPEBCXPtYkUEbp3.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
