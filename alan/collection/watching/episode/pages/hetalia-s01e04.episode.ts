import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS01e04 = {
  id: "01a183d7-7cdf-7cc0-8056-0ea1b966e3fe",
  type: "page-type/episode",
  slug: "hetalia-s01e04",
  description:
    'Meet Japan. He\'s the newest ally to Italy and Germany, and a powerful nation in his own right. But with having been isolated from the rest of the world for over 200 years, what he sees as his "normal" behavior comes off as extraordinary to others.',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-1"],
  position: 4,
  publishedAt: "2009-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797672",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1/episode/4",
    },
  ],
  title: "Meet Japan",
  episodeType: "standard",
  stillPath: "/ArdU9PGGqZDs5CE3klJIGxcjPB4.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
