import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e02 = {
  id: "01a18881-51a1-7d3a-8e4c-adceb7fa001e",
  type: "page-type/episode",
  slug: "white-collar-s03e02",
  description:
    "Peter and Neal find a treasure map on a forged will, and soon enter a race to locate the treasure and save the daughter of the beneficiary.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-3"],
  position: 2,
  publishedAt: "2011-06-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596278",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/2",
    },
  ],
  title: "Where There's a Will",
  episodeType: "standard",
  stillPath: "/Awc7hWX2AtpuKbrqgQavTDM9btY.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
