import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS05e15 = {
  id: "01a183d6-326c-7aaa-8664-25bd2ea60463",
  type: "page-type/episode",
  slug: "gintama-s05e15",
  description:
    'Kagura invites a bunch of kids to the Yorozuya. They, along with other characters get shunned by them and invites them into a "factory tour".',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-5"],
  position: 15,
  publishedAt: "2011-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940389",
      externalLink: "https://www.themoviedb.org/tv/57041/season/5/episode/15",
    },
  ],
  title: "I Can't Remember a Damn Thing About the Factory Tour",
  episodeType: "standard",
  stillPath: "/3G3ZgXDLbFTs76OF2lPF2t5ZidT.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
