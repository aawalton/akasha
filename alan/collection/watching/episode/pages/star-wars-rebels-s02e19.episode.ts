import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e19 = {
  id: "01a18853-ddfd-73e6-835d-a4e5c3213034",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e19",
  description:
    "After gaining information about the Sith, Kanan, Ezra, and Ahsoka battle the Inquisitors with the help of a new ally, but are overmatched when Vader arrives.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 19,
  publishedAt: "2016-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183161",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/19",
    },
  ],
  title: "Twilight of the Apprentice",
  episodeType: "finale",
  stillPath: "/7g8wa7PrhVa2CsGkEGWE7qXj8JQ.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
