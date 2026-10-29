import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS02e12 = {
  id: "01a1885a-252b-7869-9bae-a302bcff5abc",
  type: "page-type/episode",
  slug: "young-sheldon-s02e12",
  description:
    "When Sheldon has to spend a few days in the hospital, he turns into the world’s worst patient. Also, Missy gets a taste of what life would be like without her twin.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-2"],
  position: 12,
  publishedAt: "2019-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1648389",
      externalLink: "https://www.themoviedb.org/tv/71728/season/2/episode/12",
    },
  ],
  title: "A Tummy Ache and a Whale of a Metaphor",
  episodeType: "standard",
  stillPath: "/3nXXvakupNfxbI2HQyThn9cYfiE.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
