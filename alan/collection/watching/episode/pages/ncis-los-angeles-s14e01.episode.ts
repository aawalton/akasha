import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS14e01 = {
  id: "01a1884a-e0f7-7290-930a-06f6e1bec136",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s14e01",
  description:
    "The NCIS team searches for a suspect and their motive following the bombing of a large facility where military combat drones are assembled. Also, Callen and Kilbride get troubling news about a body found in Syria.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-14"],
  position: 1,
  publishedAt: "2022-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3800844",
      externalLink: "https://www.themoviedb.org/tv/17610/season/14/episode/1",
    },
  ],
  title: "Game of Drones",
  episodeType: "standard",
  stillPath: "/m6xBJaOXis9OIRyb52ZbzeMn32f.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
