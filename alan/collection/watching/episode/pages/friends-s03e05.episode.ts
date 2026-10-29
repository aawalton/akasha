import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e05 = {
  id: "01a18848-c2bb-7527-a6db-82356ffa70e1",
  type: "page-type/episode",
  slug: "friends-s03e05",
  description:
    "Phoebe's half-brother visits, but they have trouble bonding. Joey attempts to build an entertainment center. Ross is challenged to name the five celebrities he'd like to sleep with most.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 5,
  publishedAt: "1996-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86280",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/5",
    },
  ],
  title: "The One with Frank, Jr.",
  episodeType: "standard",
  stillPath: "/xV4gS3ZbpbDDRy1iTAzD9pWone2.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
