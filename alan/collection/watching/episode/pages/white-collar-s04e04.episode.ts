import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e04 = {
  id: "01a18881-51a2-7ca4-bd33-64bcba4e7646",
  type: "page-type/episode",
  slug: "white-collar-s04e04",
  description: "The team investigates a widow on the verge of an inheritance.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-4"],
  position: 4,
  publishedAt: "2012-07-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596296",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/4",
    },
  ],
  title: "Parting Shots",
  episodeType: "standard",
  stillPath: "/vPOTUryaZdi8FPn3pGWgSAzHr9S.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
