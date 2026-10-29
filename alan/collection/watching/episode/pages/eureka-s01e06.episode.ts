import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e06 = {
  id: "01a18848-3730-7d96-8b15-699fd12f12cf",
  type: "page-type/episode",
  slug: "eureka-s01e06",
  description:
    "A sleeping weapons system is accidentally awakened by Fargo and Spencer. Henry tries to avert the pending catastrophe with the help of a retired, nonsensical scientist.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 6,
  publishedAt: "2006-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335233",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/6",
    },
  ],
  title: "Dr. Nobel",
  episodeType: "standard",
  stillPath: "/q6JTvxtXdfkNXVMwKbTOq5YOHqY.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
