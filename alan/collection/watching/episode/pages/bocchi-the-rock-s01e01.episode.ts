import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e01 = {
  id: "01a183d9-6b67-7546-925a-db1c2beab315",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e01",
  description:
    "Introverted Bocchi takes up the guitar in hopes of meeting friends, but her social anxiety is not so easily conquered...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 1,
  publishedAt: "2022-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2739157",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/1",
    },
  ],
  title: "Lonely Rolling Bocchi",
  episodeType: "standard",
  stillPath: "/svwWmmG7pzDKm3DUdgUEvk3h0ZM.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
