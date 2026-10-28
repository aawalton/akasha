import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS01e01 = {
  id: "01a183db-7937-7c3f-84ba-abe0ef679661",
  type: "page-type/episode",
  slug: "monogatari-s01e01",
  description:
    "High school senior Koyomi Araragi discovers a shocking secret one day after helping his classmate Hitagi Senjougahara—a secret he is never to tell.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-1"],
  position: 1,
  publishedAt: "2009-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907790",
      externalLink: "https://www.themoviedb.org/tv/46195/season/1/episode/1",
    },
  ],
  title: "Hitagi Crab (1)",
  episodeType: "standard",
  stillPath: "/v3y4HkePhLeVb4LtOQTdyELO3x2.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
