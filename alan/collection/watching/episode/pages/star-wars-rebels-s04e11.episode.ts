import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e11 = {
  id: "01a18853-ddff-78cb-b404-64f84b87f798",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e11",
  description:
    "Reeling from a devastating loss, the Ghost crew rallies together to find a new purpose and resolve.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 11,
  publishedAt: "2018-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1435378",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/11",
    },
  ],
  title: "DUME",
  episodeType: "standard",
  stillPath: "/4z5dGIXeyPYPGxgrfdyAtQnjxox.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
