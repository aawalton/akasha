import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e20 = {
  id: "01a18848-c2c0-7674-a0c5-32bd66c2a08b",
  type: "page-type/episode",
  slug: "friends-s05e20",
  description:
    "While the guys go on a ride-along with Gary, Rachel accidentally deletes a message from Emily on Ross's answering machine.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 20,
  publishedAt: "1999-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86577",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/20",
    },
  ],
  title: "The One with the Ride Along",
  episodeType: "standard",
  stillPath: "/5xBJqfHQI3qUOC9XB5ePZzbYD4L.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
