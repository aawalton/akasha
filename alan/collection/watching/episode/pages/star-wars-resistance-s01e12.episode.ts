import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e12 = {
  id: "01a18853-f9af-7915-bdad-8a9e0dda9195",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e12",
  description:
    "In exchange for parts, Kaz minds Acquisitions for Flix and Orka and comes into conflict with a shady alien customer in league with the First Order.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 12,
  publishedAt: "2019-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1677545",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/12",
    },
  ],
  title: "Dangerous Business",
  episodeType: "standard",
  stillPath: "/4v1NIyd22qPq8n74XK2zDgi8dzL.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
