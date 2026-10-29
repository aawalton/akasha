import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e04 = {
  id: "01a1884b-ef63-737b-bb80-a2b31df60780",
  type: "page-type/episode",
  slug: "ncis-s02e04",
  description:
    "A body of a woman in a Navy uniform is found by two sailors. Ducky links the murder to an unsolved case from ten years ago, and the team searches for a serial killer who left a note promising to return.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 4,
  publishedAt: "2004-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334499",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/4",
    },
  ],
  title: "Lt. Jane Doe",
  episodeType: "standard",
  stillPath: "/7CyBcg8FCg5shib7KHSthWqUBkw.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
