import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS01e30 = {
  id: "01a183dc-5612-7e45-846a-1daf59b8dc2a",
  type: "page-type/episode",
  slug: "dragon-ball-z-s01e30",
  description:
    "Goku decides to take on mighty Vegeta all by himself! The two appear evenly matched, but both are hiding their true strength. The epic battle is underway - which mighty warrior will claim victory?",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-1"],
  position: 30,
  publishedAt: "1989-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969610",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1/episode/30",
    },
  ],
  title: "Goku vs. Vegeta",
  episodeType: "standard",
  stillPath: "/637VS7fJd82IoD3MnvKmncyTnVU.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
