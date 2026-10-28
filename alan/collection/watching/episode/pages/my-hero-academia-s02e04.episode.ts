import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e04 = {
  id: "01a183d4-acc3-7700-a7d2-25360ef0ab01",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e04",
  description:
    "Izuku’s having trouble finding a team for the cavalry battle in the next round of the U.A. sports festival. Luckily, he has a plan.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 4,
  publishedAt: "2017-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1306162",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/4",
    },
  ],
  title: "Strategy, Strategy, Strategy",
  episodeType: "standard",
  stillPath: "/pbCRVejJJF5tOd2c7DdxbqmCf5p.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
