import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e07 = {
  id: "01a1884b-ef6a-7541-857f-8bdc6731a00b",
  type: "page-type/episode",
  slug: "ncis-s07e07",
  description:
    "With the team's help, Vance faces his demons while uncovering a complex relationship with a killer that puts his whole family in danger.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 7,
  publishedAt: "2009-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334549",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/7",
    },
  ],
  title: "Endgame",
  episodeType: "standard",
  stillPath: "/cR5pvpqOcOJREHydOVEtbAfeP3O.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
