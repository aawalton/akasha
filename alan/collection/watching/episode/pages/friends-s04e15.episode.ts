import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e15 = {
  id: "01a18848-c2be-7742-b648-b39a73a5e35b",
  type: "page-type/episode",
  slug: "friends-s04e15",
  description:
    "Chandler runs into Janice, and finds her more irritating than ever. Meanwhile, Ross attempts to learn how to play rugby to impress Emily and Monica obsesses over an electric switch in her new apartment.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 15,
  publishedAt: "1998-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86483",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/15",
    },
  ],
  title: "The One with All the Rugby",
  episodeType: "standard",
  stillPath: "/sTWf0xRUTztjHXElg65TiXKW4nS.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
