import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e11 = {
  id: "01a18848-c2bc-7557-a922-247473894fad",
  type: "page-type/episode",
  slug: "friends-s03e11",
  description:
    "Ross is suspicious about Rachel's possible job offer from a good-looking stranger.  And a drunken Chandler fools around with one of Joey's sisters, but he can't remember which one.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 11,
  publishedAt: "1997-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86340",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/11",
    },
  ],
  title: "The One Where Chandler Can't Remember Which Sister",
  episodeType: "standard",
  stillPath: "/14vp2eC2vuJvvmxry86j6gugpNF.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
