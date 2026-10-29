import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e01 = {
  id: "01a18848-c2ba-7014-876b-1c3df2c4fe9f",
  type: "page-type/episode",
  slug: "friends-s02e01",
  description:
    "Rachel waits patiently at the airport for Ross, returning from China. Meanwhile, after giving Joey and Chandler new haircuts, Phoebe is persuaded to cut Monica's hair. And Joey learns that his tailor is a very naughty man.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 1,
  publishedAt: "1995-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86118",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/1",
    },
  ],
  title: "The One with Ross's New Girlfriend",
  episodeType: "standard",
  stillPath: "/qvo0ScRWNjtMCOpjj8vto7Xepjw.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
