import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e06 = {
  id: "01a18848-c2bf-7e83-a545-ce4443529dab",
  type: "page-type/episode",
  slug: "friends-s05e06",
  description:
    "Emily decides that the only way to continue her marriage with Ross is to have him get rid of all traces of Rachel in his apartment.  Meanwhile, Rachel and Monica mistake a hairy neighbor for a yeti.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 6,
  publishedAt: "1998-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86542",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/6",
    },
  ],
  title: "The One with the Yeti",
  episodeType: "standard",
  stillPath: "/t8frUbTNAaU585dwir1wRcylauR.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
