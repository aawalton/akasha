import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const galactica1980S01e02 = {
  id: "01a18848-eded-742d-b424-9b044e6c2424",
  type: "page-type/episode",
  slug: "galactica-1980-s01e02",
  description:
    "When treacherous Xavier travels back in time, Troy and Dillon must race to capture him before the space-age technology falls into the hands of the Nazis.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/galactica-1980-season-1"],
  position: 2,
  publishedAt: "1980-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335319",
      externalLink: "https://www.themoviedb.org/tv/4621/season/1/episode/2",
    },
  ],
  title: "Galactica Discovers Earth (2)",
  episodeType: "standard",
  stillPath: "/1u8NEODP1wg0TbUhZODIuvma668.jpg",
  voteAverage: 4.1,
  createdAt: "2026-10-29T15:30:43.309Z",
  updatedAt: "2026-10-29T15:30:43.309Z",
} as const satisfies Episode
