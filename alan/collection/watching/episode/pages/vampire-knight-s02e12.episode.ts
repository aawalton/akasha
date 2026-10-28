import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS02e12 = {
  id: "01a183d8-f258-7020-ac51-482d98a5bc5b",
  type: "page-type/episode",
  slug: "vampire-knight-s02e12",
  description:
    "Yuki decides that as Guardian, she must protect all the students at the academy and fight Rido.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-2"],
  position: 12,
  publishedAt: "2008-12-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553047",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2/episode/12",
    },
  ],
  title: "World's End",
  episodeType: "standard",
  stillPath: "/qNN78U8nUglmVqX7HLytZuPrM5J.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
