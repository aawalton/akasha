import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e111 = {
  id: "01a183d1-bb52-70f8-b91d-27e688666809",
  type: "page-type/episode",
  slug: "naruto-s03e111",
  description:
    "The Sound Ninja have Sasuke in their clutches and it's up to the Hidden Leaf Village's top Shinobi to stop them.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 111,
  publishedAt: "2004-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908088",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/111",
    },
  ],
  title: "Sound vs. Leaf",
  episodeType: "standard",
  stillPath: "/noFI1tY7U3oXWgw6FqzJENs3w2E.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
