import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e12 = {
  id: "01a1884b-ef82-7a16-9585-cbaeda57c4df",
  type: "page-type/episode",
  slug: "ncis-s20e12",
  description:
    "When an old pal of Torres’ comes to him, disheveled and bloodied for guidance amidst an undercover FBI operation and then disappears, NCIS helps track him down.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 12,
  publishedAt: "2023-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4163075",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/12",
    },
  ],
  title: "Big Rig",
  episodeType: "standard",
  stillPath: "/kBoepzK8L15IduPiz4OsxyaADLr.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
