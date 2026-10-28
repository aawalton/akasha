import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e01 = {
  id: "01a183d4-acc3-716a-a2f6-a2cd5703507a",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e01",
  description:
    "As U.A. students and teachers recover from the League of Villains attack on USJ, Izuku learns about why Ochaco wants to become a hero.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 1,
  publishedAt: "2017-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1297726",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/1",
    },
  ],
  title: "That’s the Idea, Ochaco",
  episodeType: "standard",
  stillPath: "/990nN2loj7j1NzqWVf5JbxNIQZD.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
