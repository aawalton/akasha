import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e01 = {
  id: "01a183d6-3265-732f-952e-f014730c3f61",
  type: "page-type/episode",
  slug: "gintama-s03e01",
  description:
    'Gintoki gives his suggestions to the editor and author of "Gintaman" on what should the series improve on.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 1,
  publishedAt: "2008-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940486",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/1",
    },
  ],
  title: "The More Something Is Disliked, the More Lovely It Is",
  episodeType: "standard",
  stillPath: "/6zbgE8OA0jBJFhzlVtGSr1ku4LV.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
