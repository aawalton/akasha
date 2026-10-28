import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e123 = {
  id: "01a183d1-bb53-70bb-b2df-8b09f04b2a8a",
  type: "page-type/episode",
  slug: "naruto-s03e123",
  description:
    "Naruto's Shadow Clones are no match for Kimimaro's attacks. But when an old bushy-browed buddy from the Leaf Village shows up, all bets are off!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 123,
  publishedAt: "2005-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908100",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/123",
    },
  ],
  title: "The Leaf's Handsome Devil!",
  episodeType: "standard",
  stillPath: "/bWxwpffChY5ZT5afoYqat5EpvUd.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
