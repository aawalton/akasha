import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS03e03 = {
  id: "01a1887e-62a8-7f01-88bd-5774ae32572f",
  type: "page-type/episode",
  slug: "elementary-s03e03",
  description:
    "Sherlock helps a math genius from his network of 'Irregulars' experts after he stumbles upon a body while participating in a math puzzle competition. Joan attempts to extend an olive branch after she learns about Kitty’s past.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-3"],
  position: 3,
  publishedAt: "2014-11-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012010",
      externalLink: "https://www.themoviedb.org/tv/1415/season/3/episode/3",
    },
  ],
  title: "Just a Regular Irregular",
  episodeType: "standard",
  stillPath: "/5fj9vQfUgJjuyRivFpcli0QftAy.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
