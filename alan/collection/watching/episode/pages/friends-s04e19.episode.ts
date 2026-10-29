import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e19 = {
  id: "01a18848-c2be-7310-8427-3494ff2930e0",
  type: "page-type/episode",
  slug: "friends-s04e19",
  description:
    "Ross proposes to Emily. Monica and Rachel try to win their apartment back from Chandler and Joey.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 19,
  publishedAt: "1998-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1007808",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/19",
    },
  ],
  title: "The One with All the Haste",
  episodeType: "standard",
  stillPath: "/qcJAFWAHCsjcrl4cxB9SLM5vek4.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
