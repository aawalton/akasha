import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e10 = {
  id: "01a1884b-ef6a-784c-a039-ca7858811841",
  type: "page-type/episode",
  slug: "ncis-s07e10",
  description:
    "The body of the son of a retired Colonel-turned-preacher is found and the team have their suspicions that he may be the victim of a hate crime.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 10,
  publishedAt: "2009-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334552",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/10",
    },
  ],
  title: "Faith",
  episodeType: "mid-season",
  stillPath: "/zqQ9gCMDJZPUVao85NN5CWVjFMW.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
