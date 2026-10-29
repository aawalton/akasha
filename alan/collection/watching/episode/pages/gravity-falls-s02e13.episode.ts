import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e13 = {
  id: "01a18849-545f-79c5-a9b7-dc46a1bc755e",
  type: "page-type/episode",
  slug: "gravity-falls-s02e13",
  description:
    "Dipper finds an unlikely friend to join him with his newest obsession, a board game called “Dungeons, Dungeons & More Dungeons.”",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 13,
  publishedAt: "2015-08-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1087596",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/13",
    },
  ],
  title: "Dungeons, Dungeons, & More Dungeons",
  episodeType: "standard",
  stillPath: "/kWRZtBWCKGQszBkUo8U4aD9ict.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
