import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iHopeYouDanceThePowerAndSpiritOfSong = {
  id: "01a17499-8946-7d45-93de-6182ef0949f1",
  type: "page-type/movie",
  slug: "i-hope-you-dance-the-power-and-spirit-of-song",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "399271",
      externalLink: "https://www.themoviedb.org/movie/399271",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I Hope You Dance: The Power and Spirit of Song",
  genres: ["Documentary", "Family"],
  imdbId: "tt2317770",
  posterPath: "/7FgbIJc6qEt2lyLO4aLIUar5hxq.jpg",
  voteAverage: 0,
  streamingOn: ["Tubi TV"],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
