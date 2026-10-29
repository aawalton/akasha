import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e05 = {
  id: "01a18848-c2bd-7775-9f60-828a51acbef4",
  type: "page-type/episode",
  slug: "friends-s04e05",
  description:
    "Chandler hits on a woman at Central Perk, not realizing she is Joey's new girlfriend. He soon realizes he is very attracted to, possibly in love, with her. Ross and Rachel play the jealousy game in their relationships. And Phoebe desperately tries to catch a cold after discovering that her voice is sexier and her singing better when she has phlegm in her throat.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 5,
  publishedAt: "1997-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86401",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/5",
    },
  ],
  title: "The One with Joey's New Girlfriend",
  episodeType: "standard",
  stillPath: "/3Hym8m1BzQct9GHljwzNgLPQoLy.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
