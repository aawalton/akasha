import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e15 = {
  id: "01a183d4-acc3-7ab8-81ac-bf69a6b8745f",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e15",
  description:
    "The U.A. students are finally starting to get the hang of their internships, but Izuku has much more to learn about One For All.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 15,
  publishedAt: "2017-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1337708",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/15",
    },
  ],
  title: "Midoriya and Shigaraki",
  episodeType: "standard",
  stillPath: "/wbQeN6iHHc5NtfQImDMTX83wxJA.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
