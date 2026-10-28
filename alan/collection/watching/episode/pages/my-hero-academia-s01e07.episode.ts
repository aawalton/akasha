import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e07 = {
  id: "01a183d4-acc2-7fec-a039-67c37d684bd7",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e07",
  description:
    "Izuku is up against Katsuki in their first class with All Might! Can he and Uraraka beat the villain team of Katsuki and Tenya before time runs out?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 7,
  publishedAt: "2016-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183876",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/7",
    },
  ],
  title: "Deku vs. Kacchan",
  episodeType: "standard",
  stillPath: "/vZn3Ri5a7LRDYq4qde8KAlUADqA.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
