import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const runawaysS02e01 = {
  id: "01a18851-864b-78fd-b13e-388712838cdb",
  type: "page-type/episode",
  slug: "runaways-s02e01",
  description:
    "The kids struggle with their new lives as Runaways, but find a hideout. Alex goes to work for Darius while PRIDE plots to kill Jonah. Jonah initiates a plan to build a new box.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-runaways-season-2"],
  position: 1,
  publishedAt: "2018-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1548542",
      externalLink: "https://www.themoviedb.org/tv/67466/season/2/episode/1",
    },
  ],
  title: "Gimme Shelter",
  episodeType: "standard",
  stillPath: "/Agw1Oy2VaYNHiwVjZEkbPru4Dj7.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:40:06.602Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Episode
