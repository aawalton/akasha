import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e12 = {
  id: "01a1884b-ef7a-7ca8-81f4-ebaa8ca18f68",
  type: "page-type/episode",
  slug: "ncis-s18e12",
  description:
    "Evidence from the stabbing of a Marine Sergeant leads Torres to meet his father who left when he was a child.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 12,
  publishedAt: "2021-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704077",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/12",
    },
  ],
  title: "Sangre",
  episodeType: "standard",
  stillPath: "/egQUHdbQhghtcM6bceIwu3yKtCA.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
