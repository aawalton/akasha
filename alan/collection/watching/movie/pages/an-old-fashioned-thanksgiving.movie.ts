import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anOldFashionedThanksgiving = {
  id: "01a17499-470b-7c3d-ad82-39c2a0d2c5ff",
  type: "page-type/movie",
  slug: "an-old-fashioned-thanksgiving",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "24364",
      externalLink: "https://www.themoviedb.org/movie/24364",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/An_Old_Fashioned_Thanksgiving",
    },
  ],
  title: "An Old Fashioned Thanksgiving",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt1217590",
  posterPath: "/t6TU4fKsJs5bxnpSNUKEZQUGmKl.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Plex",
    "Plex Channel",
    "Pluto TV",
    "Shout! Factory Amazon Channel",
    "Shout! Factory TV",
    "The Roku Channel",
    "Tubi TV",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
