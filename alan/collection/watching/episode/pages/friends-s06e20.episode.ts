import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e20 = {
  id: "01a18848-c2c2-74ef-9a19-d54092a9d32d",
  type: "page-type/episode",
  slug: "friends-s06e20",
  description:
    'Ross meets Elizabeth\'s father for the first time and unfortunately he takes an instant disliking to Ross. However Paul does hit it off with Rachel and she tries to talk Ross up but does so with mixed results. Joey almost gets fired from "Mac and C.H.E.E.S.E." after offending the operator of the robot. Meanwhile, Phoebe writes a book based on Monica and Chandler.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 20,
  publishedAt: "2000-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86946",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/20",
    },
  ],
  title: "The One Where Ross Meets Elizabeth's Dad",
  episodeType: "standard",
  stillPath: "/5t8pBcCf87asXhsO1UYvECTKU1b.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
