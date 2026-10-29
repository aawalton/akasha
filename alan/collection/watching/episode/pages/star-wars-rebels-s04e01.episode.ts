import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e01 = {
  id: "01a18853-ddfe-7392-b94c-2d59addbcc67",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e01",
  description:
    "Sabine leads Ezra, Kanan and an army of her fellow Mandalorians back to her home world to rescue her father from the clutches of the Empire.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 1,
  publishedAt: "2017-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1380327",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/1",
    },
  ],
  title: "Heroes of Mandalore (1)",
  episodeType: "standard",
  stillPath: "/js5C9otCjzHex9HIZOatoemGyPc.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
