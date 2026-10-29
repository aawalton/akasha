import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS03e01 = {
  id: "01a18856-986a-7a0b-96f9-bfa82ea3c6b1",
  type: "page-type/episode",
  slug: "the-chosen-s03e01",
  description:
    "Jesus delivers the most life-altering sermon in history. The result? More followers, more enemies, and disciples ready to follow Jesus anywhere. Simon and Eden reunite, Matthew faces his past, and Andrew visits John the Baptist in prison.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-3"],
  position: 1,
  publishedAt: "2022-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4064181",
      externalLink: "https://www.themoviedb.org/tv/85077/season/3/episode/1",
    },
  ],
  title: "Homecoming",
  episodeType: "standard",
  stillPath: "/gPCVrcf8wBKfezwkYZp2hIUmDDn.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
