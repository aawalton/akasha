import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e08 = {
  id: "01a18843-d14c-7406-87ef-4b2af812b938",
  type: "page-type/episode",
  slug: "bluey-s01e08",
  description:
    "Not wanting to go to bed, Bluey tries to dream about being a nocturnal fruit bat so she can stay up all night long and soon finds herself flying through the night sky.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 8,
  publishedAt: "2018-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593874",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/8",
    },
  ],
  title: "Fruitbat",
  episodeType: "standard",
  stillPath: "/jK63ogwEHXrts80FmOEABqWE3BW.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
