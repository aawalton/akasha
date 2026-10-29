import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS04e01 = {
  id: "01a18852-f34b-7355-95c9-81913b7d61fa",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s04e01",
  description:
    "The Cerritos ensigns must assist a caretaker on the voyage of a historically significant starship.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-4"],
  position: 1,
  publishedAt: "2023-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4596074",
      externalLink: "https://www.themoviedb.org/tv/85948/season/4/episode/1",
    },
  ],
  title: "Twovix",
  episodeType: "standard",
  stillPath: "/oIfbPn5o7CxfawFPgu2FOG5hgnO.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
