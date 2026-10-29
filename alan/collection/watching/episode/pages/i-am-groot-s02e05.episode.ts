import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS02e05 = {
  id: "01a1887e-c695-79b9-b7a3-e1339293235f",
  type: "page-type/episode",
  slug: "i-am-groot-s02e05",
  description:
    "In this adventure narrated by The Watcher, Groot finds himself in the heart of an ancient Drez-Lar temple with a mythic prophecy he must fulfill to save the universe.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/i-am-groot-season-2"],
  position: 5,
  publishedAt: "2023-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4629243",
      externalLink: "https://www.themoviedb.org/tv/232125/season/2/episode/5",
    },
  ],
  title: "Groot and the Great Prophecy",
  episodeType: "finale",
  stillPath: "/o7gblk3nygQh2lEIjCHEdLK3RHA.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
