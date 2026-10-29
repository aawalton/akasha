import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e20 = {
  id: "01a18848-c2b9-7081-a043-b00262a062f9",
  type: "page-type/episode",
  slug: "friends-s01e20",
  description:
    "Rachel and Barry start dating again, which is kind of awkward since he's now engaged to Mindy, who wants Rachel to be her maid of honor. Meanwhile, Chandler goes nuts when a woman he likes won't return his phone calls.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 20,
  publishedAt: "1995-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86091",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/20",
    },
  ],
  title: "The One with the Evil Orthodontist",
  episodeType: "standard",
  stillPath: "/2pcBJuqhFoL2Vp0UdZwl40M1Xkl.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
