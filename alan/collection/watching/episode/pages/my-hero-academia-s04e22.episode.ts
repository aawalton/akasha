import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e22 = {
  id: "01a183d4-acc7-7a2e-9e27-0b26167e30e8",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e22",
  description:
    "Izuku must stop Gentle Criminal and his partner, La Brava, or else the school festival will be cancelled.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 22,
  publishedAt: "2020-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2181401",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/22",
    },
  ],
  title: "School Festival Start!!",
  episodeType: "standard",
  stillPath: "/a61IwJeorvJsj18lGwAvO6coYSD.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
