import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e20 = {
  id: "01a1884b-ef65-7b96-b8ac-d6c380e96bbb",
  type: "page-type/episode",
  slug: "ncis-s03e20",
  description:
    "When a Pentagon cryptographer is found dead, the NCIS team have to discover whether she was or wasn't a Pentagon mole, and if she committed suicide. As the investigation continues, the team discover that the cryptographer wasn't alone when she died.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 20,
  publishedAt: "2006-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334536",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/20",
    },
  ],
  title: "Untouchable",
  episodeType: "standard",
  stillPath: "/z0XHty0dfXdBLUyJPstjCICaNom.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
