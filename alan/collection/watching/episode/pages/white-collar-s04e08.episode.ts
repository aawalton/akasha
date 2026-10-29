import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e08 = {
  id: "01a18881-51a2-7dac-ba45-dbee523fe082",
  type: "page-type/episode",
  slug: "white-collar-s04e08",
  description: "The team investigates a series of museum heists that target rare artifacts.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-4"],
  position: 8,
  publishedAt: "2012-09-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596300",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/8",
    },
  ],
  title: "Ancient History",
  episodeType: "standard",
  stillPath: "/g9p52wm0skE9ylNllmAJsM2RbGE.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
