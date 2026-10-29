import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e04 = {
  id: "01a18848-c2c7-70b2-8fb6-945b77126932",
  type: "page-type/episode",
  slug: "friends-s10e04",
  description:
    "On Emma's first birthday, Ross and Rachel convince everyone to delay their plans so they can attend her party, however plans go awry when Emma's birthday cake is revealed.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 4,
  publishedAt: "2003-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87596",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/4",
    },
  ],
  title: "The One with the Cake",
  episodeType: "standard",
  stillPath: "/fY5jQGe5Z6yyV66ElDGwDcNZGMQ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
