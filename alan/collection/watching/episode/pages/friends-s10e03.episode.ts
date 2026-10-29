import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e03 = {
  id: "01a18848-c2c7-77f0-8642-2b4d96ee8347",
  type: "page-type/episode",
  slug: "friends-s10e03",
  description:
    "Ross goes to a spray-on tanning salon but fails to follow the 'simple' instructions. Meanwhile, Joey and Rachel struggle to make the transition from friends to lovers. Also, Monica and Phoebe try to avoid an annoying woman that used to live in their building.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 3,
  publishedAt: "2003-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87590",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/3",
    },
  ],
  title: "The One with Ross's Tan",
  episodeType: "standard",
  stillPath: "/u2NYOpUX2ZE1KFkBr2h5mrYiN1P.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
