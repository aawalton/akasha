import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e01 = {
  id: "01a18848-c2b8-7b97-bba6-5d0e4ad4c9cb",
  type: "page-type/episode",
  slug: "friends-s01e01",
  description:
    "After Rachel leaves her fiancé at the altar, she moves in with Monica and finds that independence is not so easy, particularly without Daddy's credit cards.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 1,
  publishedAt: "1994-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85987",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/Slm6IczgHJWpR4dIv33IRtNrq5.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
