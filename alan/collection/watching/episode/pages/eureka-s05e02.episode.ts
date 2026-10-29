import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e02 = {
  id: "01a18848-3734-7204-a0ee-e0b95407469c",
  type: "page-type/episode",
  slug: "eureka-s05e02",
  description:
    "The town huddles in a last attempt to locate the vanished Astraeus before it's too late!",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 2,
  publishedAt: "2012-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335293",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/2",
    },
  ],
  title: "The Real Thing",
  episodeType: "standard",
  stillPath: "/ic8q4LjBPfUPj9lC8MDdows1ASF.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
