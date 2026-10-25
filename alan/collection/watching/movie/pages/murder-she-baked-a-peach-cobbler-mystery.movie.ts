import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderSheBakedAPeachCobblerMystery = {
  id: "01a17499-a7d6-7157-a767-283db9bdbc6d",
  type: "page-type/movie",
  slug: "murder-she-baked-a-peach-cobbler-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 2,
  publishedAt: "2016-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "371181",
      externalLink: "https://www.themoviedb.org/movie/371181",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder, She Baked: A Peach Cobbler Mystery",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt5317546",
  posterPath: "/j01HSBHf7EhYXdlI4vbdRrqX7Tf.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
