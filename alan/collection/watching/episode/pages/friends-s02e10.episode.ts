import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e10 = {
  id: "01a18848-c2ba-7365-8c0f-a87fa30de4b7",
  type: "page-type/episode",
  slug: "friends-s02e10",
  description:
    "Monica gets back together with Fun Bobby. Joey lands a role of a neurosurgeon on Days of Our Lives. And Rachel, dating a guy named Russ, can't see his uncanny resemblance to Ross.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 10,
  publishedAt: "1996-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86131",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/10",
    },
  ],
  title: "The One with Russ",
  episodeType: "standard",
  stillPath: "/wqusgdKbcwbOjhYVWA9c0X5paa7.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
