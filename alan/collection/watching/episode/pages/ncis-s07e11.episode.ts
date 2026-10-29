import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e11 = {
  id: "01a1884b-ef6a-7dc6-9700-006feccee8eb",
  type: "page-type/episode",
  slug: "ncis-s07e11",
  description:
    "When a Navy pilot is found dead under strange circumstances in a secluded area, the team finds themselves battling a no-nonsense attorney with a hidden agenda.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 11,
  publishedAt: "2010-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334564",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/11",
    },
  ],
  title: "Ignition",
  episodeType: "standard",
  stillPath: "/S4tG6C3tSkMA3dljzBewREDzFs.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
