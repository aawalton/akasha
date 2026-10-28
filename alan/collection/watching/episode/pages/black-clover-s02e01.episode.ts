import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackCloverS02e01 = {
  id: "01a183da-1967-7584-9a79-e4aee70f5cdc",
  type: "page-type/episode",
  slug: "black-clover-s02e01",
  description:
    "Asta trains with Nacht and the Magic Knights prepare an attack to get Yami and Vangeance back.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-clover-season-2"],
  position: 1,
  publishedAt: "2026-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903420",
      externalLink: "https://www.themoviedb.org/tv/73223/season/2/episode/1",
    },
  ],
  title: "The Battle Begins",
  episodeType: "standard",
  stillPath: "/wKaWS9VbvZrl8V7gSpThYYqkNuW.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Episode
