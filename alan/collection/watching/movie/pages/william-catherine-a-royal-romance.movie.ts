import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const williamCatherineARoyalRomance = {
  id: "01a17499-66a3-7e6d-903f-151cf5dd355a",
  type: "page-type/movie",
  slug: "william-catherine-a-royal-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "208000",
      externalLink: "https://www.themoviedb.org/movie/208000",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/William_&_Catherine:_A_Royal_Romance",
    },
  ],
  title: "William & Catherine: A Royal Romance",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt1849218",
  posterPath: "/diV7KoQ3xRsZmLuZyp3E7oFIuCc.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "Plex",
    "Plex Channel",
    "Shout! Factory Amazon Channel",
    "Shout! Factory TV",
    "The Roku Channel",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
