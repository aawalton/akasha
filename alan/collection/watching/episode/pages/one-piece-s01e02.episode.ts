import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e02 = {
  id: "01a18884-52e4-78c9-ad75-44ef1fc85bb6",
  type: "page-type/episode",
  slug: "one-piece-s01e02",
  description:
    "Luffy and Coby arrive at Shell Island, a Marine base. They meet the bounty hunter Roronoa Zoro, held under arrest by the infamous marine, Captain Morgan, and his son Helmeppo.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 2,
  publishedAt: "1999-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "852693",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/2",
    },
  ],
  title: "The Great Swordsman Appears! Pirate Hunter, Roronoa Zoro",
  episodeType: "standard",
  stillPath: "/him2IAMOhTToCMGwCzBxHCD9cPf.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
