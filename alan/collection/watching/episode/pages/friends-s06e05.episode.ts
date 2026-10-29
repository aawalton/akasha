import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e05 = {
  id: "01a18848-c2c1-70ea-988a-3f72d31e6627",
  type: "page-type/episode",
  slug: "friends-s06e05",
  description:
    "Ross and Rachel try to get an annulment, but run into some legal obstacles. Joey finds keys to a Porsche in Central Perk and discovers some perks of being a fancy car owner. Meanwhile, Chandler, Monica and Phoebe babysit the triplets.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 5,
  publishedAt: "1999-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1007810",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/5",
    },
  ],
  title: "The One with Joey's Porsche",
  episodeType: "standard",
  stillPath: "/itDy7O5nij71D7Z1MZXJjlLB9w0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
