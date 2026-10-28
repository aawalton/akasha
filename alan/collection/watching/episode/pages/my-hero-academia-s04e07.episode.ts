import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e07 = {
  id: "01a183d4-acc6-7be3-968d-f4b3346fbf85",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e07",
  description:
    "The work study students wait until the pro heroes find Eri and it’s time to start the operation to save her.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 7,
  publishedAt: "2019-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1958021",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/7",
    },
  ],
  title: "GO!!",
  episodeType: "standard",
  stillPath: "/lHye1zOrBxgBHIESLDJcSgGcHUb.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
