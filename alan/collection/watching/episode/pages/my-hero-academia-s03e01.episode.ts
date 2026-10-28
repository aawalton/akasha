import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e01 = {
  id: "01a183d4-acc4-78e7-b135-0bc5ceed3e60",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e01",
  description:
    "Before the U.A. students head to their training camp, Class 1-A goes to the pool for extra training, and the League of Villains plots their next move.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 1,
  publishedAt: "2018-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448434",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/1",
    },
  ],
  title: "Game Start",
  episodeType: "standard",
  stillPath: "/pjnVvLF7dkrUf5A7FScFQxKZQ1t.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
