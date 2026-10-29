import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e10 = {
  id: "01a18880-75e9-78eb-b5f2-51f4cf7a0d77",
  type: "page-type/episode",
  slug: "the-mentalist-s04e10",
  description:
    "During the search for a firefighter's killer, Jane is attacked and nearly drowned, resulting in a temporary loss of his memory and a return to his pre-CBI con man persona.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 10,
  publishedAt: "2011-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367770",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/10",
    },
  ],
  title: "Fugue in Red",
  episodeType: "mid-season",
  stillPath: "/3cwaUBQmOSjCMjMqDIpaT5jOopu.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
