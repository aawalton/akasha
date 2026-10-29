import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e14 = {
  id: "01a18848-c2bc-799a-9b55-9af06b5359e8",
  type: "page-type/episode",
  slug: "friends-s03e14",
  description:
    'Phoebe is reunited with her former singing partner who thinks "Smelly Cat" has hit potential; Chandler dates a woman with a prosthetic leg who also has some history with Joey. Meanwhile, Ross goes to a fashion seminar with Rachel, so she won\'t go with Mark, but falls asleep in the middle of it.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 14,
  publishedAt: "1997-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1007807",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/14",
    },
  ],
  title: "The One with Phoebe's Ex-Partner",
  episodeType: "standard",
  stillPath: "/3Towvxh6qAtJycuJ7XW8GJQhB3N.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
