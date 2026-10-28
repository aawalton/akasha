import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e05 = {
  id: "01a183d4-acc3-7566-ba58-b2c31a31c181",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e05",
  description:
    "Fighting it out in the second half of the cavalry battle, does Team Midoriya have what it takes to stay in the top four?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 5,
  publishedAt: "2017-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1307042",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/5",
    },
  ],
  title: "Cavalry Battle Finale",
  episodeType: "standard",
  stillPath: "/dQGJ9LmiQrMtdSsh7wA5W3aCWJt.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
