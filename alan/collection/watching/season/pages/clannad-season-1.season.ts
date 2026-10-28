import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const clannadSeason1 = {
  id: "01a183d7-50e1-7480-9c93-550fc928abdf",
  type: "page-type/season",
  slug: "clannad-season-1",
  description:
    "Tortured by his past and pained by an uncertain future, Tomoya drifts through life with an almost overwhelming anger and emptiness. But when he meets the mysterious, beautiful, and shy Nagisa, his world seems to change. Drawn in by her gentle but lonely spirit, he begins to experience the joy life can bring when surrounded by others. But as he discovers the reason for his newfound friend's loneliness, Tomoya also finds that life can be frighteningly fragile.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/clannad"],
  position: 1,
  publishedAt: "2007-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "35033",
      externalLink: "https://www.themoviedb.org/tv/24835/season/1",
    },
  ],
  title: "Clannad",
  posterPath: "/dhtTpSd2r3OXrkkR2VIIydbnZ4x.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:08.670Z",
  updatedAt: "2026-10-28T18:48:08.670Z",
} as const satisfies Season
