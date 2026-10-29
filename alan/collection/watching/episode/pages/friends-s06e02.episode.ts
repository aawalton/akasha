import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e02 = {
  id: "01a18848-c2c1-7dff-9e02-c281583733f9",
  type: "page-type/episode",
  slug: "friends-s06e02",
  description:
    "Monica and Chandler decide to move in together, leading Rachel to believe that all three of them will be roommates, and Monica doesn't want to tell her the truth.  Meanwhile, Ross tries to keep Rachel from learning that their marriage hasn't been annulled.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 2,
  publishedAt: "1999-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86776",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/2",
    },
  ],
  title: "The One Where Ross Hugs Rachel",
  episodeType: "standard",
  stillPath: "/d5c8xKhUKsR4afHWc17POaCs444.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
