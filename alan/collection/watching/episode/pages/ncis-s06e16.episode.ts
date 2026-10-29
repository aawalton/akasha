import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e16 = {
  id: "01a1884b-ef69-7f6c-84cc-f3cedb289fc0",
  type: "page-type/episode",
  slug: "ncis-s06e16",
  description:
    "A murder prompts the reopening of one of Tony's old investigations, leading Gibbs and DiNozzo to reverse roles to solve the case.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 16,
  publishedAt: "2009-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334420",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/16",
    },
  ],
  title: "Bounce",
  episodeType: "standard",
  stillPath: "/9161js0tziUB6K5xJOge2PCAT1Y.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
