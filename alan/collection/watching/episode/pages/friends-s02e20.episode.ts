import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e20 = {
  id: "01a18848-c2bb-74da-8ebf-b9991e59e147",
  type: "page-type/episode",
  slug: "friends-s02e20",
  description:
    "Monica's new boyfriend impresses Chandler and Joey. Phoebe's world view is shattered when she finds out what she missed as a child, and Rachel resents the fact that Ross has planned their whole life together.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 20,
  publishedAt: "1996-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86207",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/20",
    },
  ],
  title: "The One Where Old Yeller Dies",
  episodeType: "standard",
  stillPath: "/skkcu25uGvQQFnYEIGbmsopP40d.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
