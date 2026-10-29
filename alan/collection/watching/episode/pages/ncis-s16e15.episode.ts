import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e15 = {
  id: "01a1884b-ef78-74b7-b90a-43f8827c16d3",
  type: "page-type/episode",
  slug: "ncis-s16e15",
  description:
    "The NCIS team investigates a man overboard fatality from a Navy destroyer at sea. Also, Torres is frustrated with Vance’s assignment to mentor three high school students.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 15,
  publishedAt: "2019-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1695352",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/15",
    },
  ],
  title: "Crossing the Line",
  episodeType: "standard",
  stillPath: "/kRFyeJgk3Z2PuShwYAzOBPjSoYu.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
