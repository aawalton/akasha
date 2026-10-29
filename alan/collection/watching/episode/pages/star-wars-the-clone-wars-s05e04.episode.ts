import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e04 = {
  id: "01a18854-50ac-7db2-bfea-0657278a724d",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e04",
  description:
    "After a rebel attempt to rescue Onderon's true king, Ramsis Dendup, an unexpected ally steps forward to halt Dendup's execution and aid the rebel cause.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 4,
  publishedAt: "2012-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010365",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/4",
    },
  ],
  title: "The Soft War",
  episodeType: "standard",
  stillPath: "/eo5VCy5muFt1RcsWFZyKHC7q4Y4.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
