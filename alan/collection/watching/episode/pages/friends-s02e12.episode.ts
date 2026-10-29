import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e12 = {
  id: "01a18848-c2ba-761b-9042-234d998fb01c",
  type: "page-type/episode",
  slug: "friends-s02e12",
  description:
    "Ross goes to visit Marcel, his monkey, while on a trip to California. Joey gets his first fan letter and ends up dating the woman. Phoebe is asked to sing for the children at the library, but their parents are horrified by her lyrics.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 12,
  publishedAt: "1996-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86132",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/12",
    },
  ],
  title: "The One After the Super Bowl (1)",
  episodeType: "standard",
  stillPath: "/5n6NK2LyhgOZUb3bIbgKbnGutak.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
