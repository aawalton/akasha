import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e09 = {
  id: "01a18848-c2b8-7c9b-95aa-be26515c193b",
  type: "page-type/episode",
  slug: "friends-s01e09",
  description:
    "Monica's first Thanksgiving dinner for the gang goes horribly wrong when they all run to the rooftop to see the runaway Underdog balloon from the parade.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 9,
  publishedAt: "1994-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85979",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/9",
    },
  ],
  title: "The One Where Underdog Gets Away",
  episodeType: "standard",
  stillPath: "/prrV1RMAl7oi2l3J3dq5SkHpOAN.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
