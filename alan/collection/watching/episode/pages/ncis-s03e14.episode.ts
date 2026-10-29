import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e14 = {
  id: "01a1884b-ef65-77df-9d98-deb41c1dbba8",
  type: "page-type/episode",
  slug: "ncis-s03e14",
  description:
    "The NCIS team investigate the murder of two Marine wives, and must find the murderers before they attack their next target, another woman.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 14,
  publishedAt: "2006-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334530",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/14",
    },
  ],
  title: "Light Sleeper",
  episodeType: "standard",
  stillPath: "/czbVM8BATl6nU6HpsvblBYJTAlN.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
