import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e11 = {
  id: "01a1884a-e0ed-7071-8da1-bc39fb4ac82a",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e11",
  description:
    "When a former Romanian Communist leader and suspected war criminal is discovered to be living in Los Angeles under a false identity, the NCIS: LA team must locate him before he disappears again.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 11,
  publishedAt: "2013-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968854",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/11",
    },
  ],
  title: "Iron Curtain Rising",
  episodeType: "standard",
  stillPath: "/qpqPjPYBEz5k96dIgXGahozPycJ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
