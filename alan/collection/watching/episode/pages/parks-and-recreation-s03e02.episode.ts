import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS03e02 = {
  id: "01a18850-f8bb-7f59-bdc4-6c40961cd675",
  type: "page-type/episode",
  slug: "parks-and-recreation-s03e02",
  description:
    "While planning for the local Harvest Festival, Leslie is struck with the flu and is forced to go to the hospital. Ron and Andy have a day of male bonding, and Tom hits the spa.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-3"],
  position: 2,
  publishedAt: "2011-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397652",
      externalLink: "https://www.themoviedb.org/tv/8592/season/3/episode/2",
    },
  ],
  title: "Flu Season",
  episodeType: "standard",
  stillPath: "/803OAyUIaOkjzXYmQkZ4F13aaWC.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
