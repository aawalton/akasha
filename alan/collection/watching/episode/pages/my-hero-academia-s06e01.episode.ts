import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS06e01 = {
  id: "01a183d4-acc8-7e6e-b981-a50689709eb5",
  type: "page-type/episode",
  slug: "my-hero-academia-s06e01",
  description:
    "Using the information Hawks gathered, the heroes and their work study students get ready for an attack on the Paranormal Liberation Front led by Shigaraki.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-6"],
  position: 1,
  publishedAt: "2022-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3849353",
      externalLink: "https://www.themoviedb.org/tv/65930/season/6/episode/1",
    },
  ],
  title: "A Quiet Beginning",
  episodeType: "standard",
  stillPath: "/ezH8zW6UB11eCXBR4rDI1SuQ5gs.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
