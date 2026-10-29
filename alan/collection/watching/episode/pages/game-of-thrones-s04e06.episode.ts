import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e06 = {
  id: "01a18849-08b3-750c-beba-c29984f89208",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e06",
  description:
    "Stannis and Davos set sail with a new strategy. Dany meets with supplicants. Tyrion faces down his father in the Throne Room.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 6,
  publishedAt: "2014-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63099",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/6",
    },
  ],
  title: "The Laws of Gods and Men",
  episodeType: "standard",
  stillPath: "/vKt9b7HNYhwM91C7S53zPsAWfT3.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
