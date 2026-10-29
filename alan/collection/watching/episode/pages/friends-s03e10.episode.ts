import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e10 = {
  id: "01a18848-c2bb-74c6-a538-917fa0daa57e",
  type: "page-type/episode",
  slug: "friends-s03e10",
  description:
    "Rachel makes a rash decision after Gunther tells her she needs to be retrained.  Phoebe tries to help Joey when he gets a job selling Christmas trees.  And Ross accidentally breaks a girl's leg and tries to make it up to her.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 10,
  publishedAt: "1996-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86334",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/10",
    },
  ],
  title: "The One Where Rachel Quits",
  episodeType: "mid-season",
  stillPath: "/skkFqwQlp7sLZBQTjoRAHoz7SpJ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
