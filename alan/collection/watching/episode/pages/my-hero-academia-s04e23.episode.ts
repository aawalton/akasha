import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e23 = {
  id: "01a183d4-acc7-7b5a-a7c6-7ae34686c4a2",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e23",
  description:
    "Izuku rushes back to the school festival after his encounter with Gentleman and La Brava, but will he make it in time for his performance?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 23,
  publishedAt: "2020-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2189001",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/23",
    },
  ],
  title: "Let It Flow! School Festival!",
  episodeType: "standard",
  stillPath: "/edQnTifT8rbZRQjn5Au2fR53TaV.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
