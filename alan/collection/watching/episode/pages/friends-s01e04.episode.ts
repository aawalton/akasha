import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e04 = {
  id: "01a18848-c2b8-7024-bd0c-01a32ed093c5",
  type: "page-type/episode",
  slug: "friends-s01e04",
  description:
    "While the men attend a hockey game and end up at a hospital, a delivery man accidentally brings a pizza meant for George Stephanopoulos, who lives across the street from the girls; they decide to peek at the former White House advisor with their binoculars.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 4,
  publishedAt: "1994-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85983",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/4",
    },
  ],
  title: "The One with George Stephanopoulos",
  episodeType: "standard",
  stillPath: "/zydPvr4Fe7mZ1OnWmb1SPr84OD8.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
