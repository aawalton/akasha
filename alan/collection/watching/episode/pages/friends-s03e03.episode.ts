import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e03 = {
  id: "01a18848-c2bb-7706-9d39-dce5120f0891",
  type: "page-type/episode",
  slug: "friends-s03e03",
  description:
    'Phoebe dates a man who thinks he\'s stalking her twin sister. Ross and Rachel give Chandler "boyfriend" lessons. Monica decides the best way to get over Richard is to keep herself busy, so she uses her free time to make jam and considers insemination via a sperm bank.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 3,
  publishedAt: "1996-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86277",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/3",
    },
  ],
  title: "The One with the Jam",
  episodeType: "standard",
  stillPath: "/3WFnOLRUxQL7IFlwtrpFqdf1694.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
