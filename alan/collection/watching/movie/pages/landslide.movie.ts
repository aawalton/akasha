import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const landslide = {
  id: "01a17497-3827-7dc5-a490-bcc8d8bb7c00",
  type: "page-type/movie",
  slug: "landslide",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62849",
      externalLink: "https://www.themoviedb.org/movie/62849",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Landslide",
  genres: ["Drama", "Action", "Adventure"],
  imdbId: "tt0389094",
  posterPath: "/aiBFZnPDFvkngLoPsEaG45f5U9D.jpg",
  voteAverage: 5.35,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
