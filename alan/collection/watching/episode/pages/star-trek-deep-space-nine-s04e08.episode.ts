import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS04e08 = {
  id: "01a18852-7714-728d-8fd4-12f130e028ee",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s04e08",
  description:
    "Stardate: Unknown. Worf, Dax and the Klingon Dahar master Kor set out to find an ancient lost relic: the Sword of Kahless.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-4"],
  position: 8,
  publishedAt: "1995-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005784",
      externalLink: "https://www.themoviedb.org/tv/580/season/4/episode/8",
    },
  ],
  title: "The Sword of Kahless",
  episodeType: "standard",
  stillPath: "/jNqWkoqsNDfzRP7Go6LgM8mqe90.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
