import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e12 = {
  id: "01a18853-ac8b-7050-b54d-681e01a5ce94",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e12",
  description:
    "Stardate: Unknown. Tuvok and B'Elanna are captured and imprisoned after an away mission to obtain a chemical vital to Voyager's systems from a black market go wrong. Janeway is knocked unconscious and is rescued by a man who believes that she is his daughter.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 12,
  publishedAt: "1995-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112992",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/12",
    },
  ],
  title: "Resistance",
  episodeType: "standard",
  stillPath: "/ypgVbWY2xzYzdaX6GFaZ8Nazyby.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
