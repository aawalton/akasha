import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e19 = {
  id: "01a1884b-ef82-7b78-917e-103172ceb3f1",
  type: "page-type/episode",
  slug: "ncis-s20e19",
  description:
    "Agent Knight goes viral for saving a mother and child from a potentially fatal car accident.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 19,
  publishedAt: "2023-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291824",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/19",
    },
  ],
  title: "In the Spotlight",
  episodeType: "standard",
  stillPath: "/bt8gBMuWdRrrep5KnGes491Xdlu.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
