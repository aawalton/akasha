import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theInfiniteWorldsOfHGWells = {
  id: "01a1749a-c86d-7e82-9112-c9119b42de7a",
  type: "page-type/show",
  slug: "the-infinite-worlds-of-h-g-wells",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2001-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "40182",
      externalLink: "https://www.themoviedb.org/tv/40182",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Infinite_Worlds_of_H.G._Wells",
    },
  ],
  title: "The Infinite Worlds of H.G. Wells",
  genres: ["Sci-Fi & Fantasy", "Mystery", "Drama"],
  imdbId: "tt0280770",
  posterPath: "/jEefrd36Qx7yoBqir19orzAOOqo.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Pluto TV",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
