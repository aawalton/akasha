import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS04e08 = {
  id: "01a18852-f34c-7b3a-94ad-b990cbe8057c",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s04e08",
  description: "The Lower Deckers go on a classic cave mission.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-4"],
  position: 8,
  publishedAt: "2023-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4715265",
      externalLink: "https://www.themoviedb.org/tv/85948/season/4/episode/8",
    },
  ],
  title: "Caves",
  episodeType: "standard",
  stillPath: "/wnIzkI64ECtQU8NPQR4SFo2b91m.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
