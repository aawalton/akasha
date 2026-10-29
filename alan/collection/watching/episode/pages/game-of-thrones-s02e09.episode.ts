import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e09 = {
  id: "01a18849-08b2-796d-abbb-38ea775bfb04",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e09",
  description:
    "Tyrion and the Lannisters fight for their lives as Stannis' fleet assaults King's Landing.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 9,
  publishedAt: "2012-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63072",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/9",
    },
  ],
  title: "Blackwater",
  episodeType: "standard",
  stillPath: "/rX44Vfd0iiZDIJWHYZg9j4yLSP9.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
