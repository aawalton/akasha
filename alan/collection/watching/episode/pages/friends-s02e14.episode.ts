import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e14 = {
  id: "01a18848-c2ba-7d8a-9e00-2ff27cce4529",
  type: "page-type/episode",
  slug: "friends-s02e14",
  description:
    "After getting his big break, with Days of Our Lives, Joey pays Chandler back. Monica is unemployed and hard up for money. Monica and Rachel's prom video reveals Monica's former girth, Rachel's former nose and the way Ross has always felt about Rachel.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 14,
  publishedAt: "1996-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86097",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/14",
    },
  ],
  title: "The One with the Prom Video",
  episodeType: "standard",
  stillPath: "/pdNU0SwVoHJmkCQXumvM63mSt1v.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
