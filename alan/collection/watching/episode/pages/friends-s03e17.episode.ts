import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e17 = {
  id: "01a18848-c2bc-7d53-8474-2e1b83640093",
  type: "page-type/episode",
  slug: "friends-s03e17",
  description:
    "Ross and Rachel compete to spend time with their other friends. When a lonely Ross is excluded from Rachel's ski trip with her pals, he visits Carol. On the way to the cabin, they run out of gas. Meanwhile, Chandler starts smoking again.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 17,
  publishedAt: "1997-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86358",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/17",
    },
  ],
  title: "The One Without the Ski Trip",
  episodeType: "standard",
  stillPath: "/6xO5fIPn0xa9IAS30U3POy3ZG8c.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
