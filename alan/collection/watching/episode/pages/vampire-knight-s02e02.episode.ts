import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS02e02 = {
  id: "01a183d8-f258-7493-a791-915312f4157f",
  type: "page-type/episode",
  slug: "vampire-knight-s02e02",
  description:
    "Yuki has a lot on her mind after almost being kissed by Zero. She asserts that she will not speak to Kaname until he admits to Zero’s innocence.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-2"],
  position: 2,
  publishedAt: "2008-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553037",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2/episode/2",
    },
  ],
  title: "The Eternal Promise",
  episodeType: "standard",
  stillPath: "/sjD2oCXBHbgOVym5RyPbkuysABT.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
