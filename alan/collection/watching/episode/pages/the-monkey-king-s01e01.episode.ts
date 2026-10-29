import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMonkeyKingS01e01 = {
  id: "01a18857-876e-70fe-8b8e-acafb12ad25b",
  type: "page-type/episode",
  slug: "the-monkey-king-s01e01",
  description:
    'While on an archeological dig of secret Chinese tombs, Nick\'s epic adventure begins by a "chance" meeting with Kwan Ying, a beautiful goddess sent by the Terracotta Warriors (who recognize Nick as the "Scholar from Above") to recruit him for the heroic task of rescuing the manuscript within 3 days -- or face the world\'s end.',
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["season/the-monkey-king-season-1"],
  position: 1,
  publishedAt: "2001-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1434522",
      externalLink: "https://www.themoviedb.org/tv/45613/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/1p5LxT5Q60lUQDToLLy64rBCIsR.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:46:40.110Z",
  updatedAt: "2026-10-29T15:46:40.110Z",
} as const satisfies Episode
