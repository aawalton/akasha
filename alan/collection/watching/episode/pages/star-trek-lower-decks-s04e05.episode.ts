import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS04e05 = {
  id: "01a18852-f34c-7df3-9c4a-ab9010ca7952",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s04e05",
  description: "A trio of Betazoids cause chaos on the Cerritos.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-4"],
  position: 5,
  publishedAt: "2023-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4715262",
      externalLink: "https://www.themoviedb.org/tv/85948/season/4/episode/5",
    },
  ],
  title: "Empathalogical Fallacies",
  episodeType: "standard",
  stillPath: "/4DxWfzWjrt63PI6RhWbweFZFuhC.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
