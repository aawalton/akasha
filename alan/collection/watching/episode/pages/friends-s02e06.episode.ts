import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e06 = {
  id: "01a18848-c2ba-7b34-b5a4-d79269cdd60e",
  type: "page-type/episode",
  slug: "friends-s02e06",
  description:
    "Chandler and Joey lose Ross's son, Ben, while checking out women on a bus. Phoebe loses her Central Perk singing gig to a professional singer. And Ross has an allergic reaction to Monica's kiwi-lime pie.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 6,
  publishedAt: "1995-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86121",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/6",
    },
  ],
  title: "The One with the Baby on the Bus",
  episodeType: "standard",
  stillPath: "/4RxxAAbQgt8wgOXDWXcKVUVqXr5.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
