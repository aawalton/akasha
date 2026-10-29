import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const obiWanKenobiS01e01 = {
  id: "01a1884c-3698-7bf8-a0fd-3efbdc6ee51e",
  type: "page-type/episode",
  slug: "obi-wan-kenobi-s01e01",
  description:
    "Obi-Wan Kenobi lives a humble existence on Tatooine. Despite the dangers of being a Jedi survivor at the height of the Empire, Kenobi is forced to emerge from hiding.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/obi-wan-kenobi-miniseries"],
  position: 1,
  publishedAt: "2022-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1903004",
      externalLink: "https://www.themoviedb.org/tv/92830/season/1/episode/1",
    },
  ],
  title: "Part I",
  episodeType: "standard",
  stillPath: "/twfvrChI2YEQITGbqjhEXVy39QA.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:18.520Z",
  updatedAt: "2026-10-29T15:34:18.520Z",
} as const satisfies Episode
