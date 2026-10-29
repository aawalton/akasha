import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e03 = {
  id: "01a18848-c2b8-773c-b772-9f2d9892b7b7",
  type: "page-type/episode",
  slug: "friends-s01e03",
  description:
    "Monica finds it difficult to break up with her latest boyfriend whom everyone likes; Chandler is reunited with his beloved cigarettes; Phoebe receives a large sum of money.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 3,
  publishedAt: "1994-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85981",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/3",
    },
  ],
  title: "The One with the Thumb",
  episodeType: "standard",
  stillPath: "/963xL8QC2In3dvb8ooWWA30M5JI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
