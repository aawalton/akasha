import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e16 = {
  id: "01a18844-6111-7054-a7c5-804e5cadab89",
  type: "page-type/episode",
  slug: "clone-wars-s05e16",
  description: "Using Duchess Satine as bait, Darth Maul lures Obi-Wan into a trap.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 16,
  publishedAt: "2013-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010377",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/16",
    },
  ],
  title: "The Lawless",
  episodeType: "standard",
  stillPath: "/qO93zEeFRhvzDgvCrWKyfiIoyFU.jpg",
  voteAverage: 9.5,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
