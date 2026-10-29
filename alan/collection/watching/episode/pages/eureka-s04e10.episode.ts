import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e10 = {
  id: "01a18848-3733-7aff-b62c-27ffdfc0147c",
  type: "page-type/episode",
  slug: "eureka-s04e10",
  description:
    "Carter can't get into the Christmas spirit especially with the town surrounded by a force-field. Fargo organizes the GD holiday party, and Allison is full of holiday cheer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 10,
  publishedAt: "2010-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335280",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/10",
    },
  ],
  title: "O Little Town",
  episodeType: "standard",
  stillPath: "/71AsbgU1koZmgVxEh50jCmcgHJq.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
