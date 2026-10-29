import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS08e09 = {
  id: "01a18848-c2c4-774c-99d7-0b88d2ffefed",
  type: "page-type/episode",
  slug: "friends-s08e09",
  description:
    "Monica invites Will, an old high school friend of her and Ross over for a Thanksgiving dinner, unaware that he isn't too fond of Rachel. Meanwhile, Joey vows to eat an entire turkey by himself, and Chandler and Phoebe pretend to watch a football game in order to avoid helping in the kitchen.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-8"],
  position: 9,
  publishedAt: "2001-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87309",
      externalLink: "https://www.themoviedb.org/tv/1668/season/8/episode/9",
    },
  ],
  title: "The One with the Rumor",
  episodeType: "standard",
  stillPath: "/nhQ7irmtvCdMqGbfmN21Vf0FI4H.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
