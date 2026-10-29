import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e10 = {
  id: "01a18881-51a2-74c6-af14-312454744197",
  type: "page-type/episode",
  slug: "white-collar-s04e10",
  description: "Peter and Neal pursue one of the paintings on the treasure manifest.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-4"],
  position: 10,
  publishedAt: "2012-09-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596301",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/10",
    },
  ],
  title: "Vested Interest",
  episodeType: "mid-season",
  stillPath: "/55NmkgbTeWaFGHVz5QzWX4X94Mi.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
