import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS02e04 = {
  id: "01a18852-f34b-7311-a5ba-eef9fe585b61",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s02e04",
  description:
    "The U.S.S. Cerritos is dispatched to a planet to investigate an unexplained sighting of a dangerous Mugato.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-2"],
  position: 4,
  publishedAt: "2021-09-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3170098",
      externalLink: "https://www.themoviedb.org/tv/85948/season/2/episode/4",
    },
  ],
  title: "Mugato, Gumato",
  episodeType: "standard",
  stillPath: "/aBwnEOSziZod2D6XKqOu6vAorMT.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
