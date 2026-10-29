import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e02 = {
  id: "01a18849-08b3-7d5e-adc2-5ddfc29b32cc",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e02",
  description:
    "The Lannisters and their guests gather in King's Landing; Stannis loses patience with Davos; Ramsay finds a purpose for his pet.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 2,
  publishedAt: "2014-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973219",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/2",
    },
  ],
  title: "The Lion and the Rose",
  episodeType: "standard",
  stillPath: "/zOeaRpAKbrATuVe8Z5MtVJfair9.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
