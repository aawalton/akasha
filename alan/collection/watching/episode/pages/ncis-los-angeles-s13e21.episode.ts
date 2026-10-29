import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e21 = {
  id: "01a1884a-e0f7-716e-886c-785de5733314",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e21",
  description:
    "The NCIS team must quickly find Callen after he falls for Katya’s trap using Sam’s deepfake to coordinate a weapons deal.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 21,
  publishedAt: "2022-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3700954",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/21",
    },
  ],
  title: "Down The Rabbit Hole",
  episodeType: "standard",
  stillPath: "/1D1h7bi1O54GxEImqXUm6vL6ppJ.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
