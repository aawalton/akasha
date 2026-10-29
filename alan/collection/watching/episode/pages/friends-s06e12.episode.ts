import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e12 = {
  id: "01a18848-c2c1-72dc-a88b-b7ebaaf0ca8e",
  type: "page-type/episode",
  slug: "friends-s06e12",
  description:
    "After a joke gets published in Playboy, Chandler and Ross have an argument about who came up with it first. Meanwhile, a wayward remark of Phoebe's leads to trouble between the girls and a broke Joey starts working at Central Perk.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 12,
  publishedAt: "2000-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86853",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/12",
    },
  ],
  title: "The One with the Joke",
  episodeType: "standard",
  stillPath: "/zaDAyW9hOFhFjhcYBwvNqIpDCe.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
