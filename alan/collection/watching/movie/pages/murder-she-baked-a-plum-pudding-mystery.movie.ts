import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderSheBakedAPlumPuddingMystery = {
  id: "01a17499-8947-7f49-8339-f13b0e707b20",
  type: "page-type/movie",
  slug: "murder-she-baked-a-plum-pudding-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 2,
  publishedAt: "2015-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361751",
      externalLink: "https://www.themoviedb.org/movie/361751",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder, She Baked: A Plum Pudding Mystery",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt4933782",
  posterPath: "/jcT1xa0rKzsBj6IBLgd8KJNKVsX.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T20:45:01.766Z",
} as const satisfies Movie
