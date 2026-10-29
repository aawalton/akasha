import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e13 = {
  id: "01a1884b-ef6e-72a5-bd78-da0822c33341",
  type: "page-type/episode",
  slug: "ncis-s09e13",
  description:
    "When a Navy Lieutenant Commander is found dead in a building under construction, NCIS must search for a killer while dealing with interruptions from her distraught detective husband.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 13,
  publishedAt: "2012-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334602",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/13",
    },
  ],
  title: "A Desperate Man",
  episodeType: "standard",
  stillPath: "/m7NY9Dg8LtQswpBwGV3rkmYz5LG.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
