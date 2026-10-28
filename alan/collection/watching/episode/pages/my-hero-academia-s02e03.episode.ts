import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e03 = {
  id: "01a183d4-acc3-7938-a4cd-9b425ae91a72",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e03",
  description:
    "The first years try to stand out as they struggle to finish the obstacle course and qualify for a spot in the next round.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 3,
  publishedAt: "2017-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1303621",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/3",
    },
  ],
  title: "In Their Own Quirky Ways",
  episodeType: "standard",
  stillPath: "/2zQEdjE2pxlTgDmGHTbq48M66Z5.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
