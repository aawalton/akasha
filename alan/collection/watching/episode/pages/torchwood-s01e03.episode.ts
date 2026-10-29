import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e03 = {
  id: "01a18859-3c68-7ccb-8c69-ca7d317d2430",
  type: "page-type/episode",
  slug: "torchwood-s01e03",
  description:
    "Whilst chasing a man, Gwen retrieves an unusual machine that allows the user to see back into the past. It is considered dangerous, and no members of Torchwood are permitted to use it. But Owen has other plans, and witnesses a violent murder that took place over forty years ago. Using the information he gathered, Owen starts to track down the still-living murderer.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 3,
  publishedAt: "2006-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21570",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/3",
    },
  ],
  title: "Ghost Machine",
  episodeType: "standard",
  stillPath: "/2CpmUvcmTjUjPzOdrID77Slm9rN.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
