import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS08e05 = {
  id: "01a183d4-accb-7284-8372-53680559aa12",
  type: "page-type/episode",
  slug: "my-hero-academia-s08e05",
  description:
    "The balance of power shifts between Izuku and Shigaraki when the latter steals a Quirk from One For All.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-8"],
  position: 5,
  publishedAt: "2025-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6576556",
      externalLink: "https://www.themoviedb.org/tv/65930/season/8/episode/5",
    },
  ],
  title: "History's Greatest Villain",
  episodeType: "standard",
  stillPath: "/pzUDObcaMbxtY3hseauMmIS7aTI.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
