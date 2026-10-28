import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const angelBeatsS01e01 = {
  id: "01a183dd-3da1-7977-b10e-88e1a4b0b595",
  type: "page-type/episode",
  slug: "angel-beats-s01e01",
  description:
    "After a mysterious accident, a young high school student wakes up to discover he is caught in some kind of violent afterlife where a strange and avenging Angel is pursuing him. Confused and afraid, he joins a band of gun-toting teens intent on destroying the Angel and taking their destinies into their own hands",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/angel-beats-season-1"],
  position: 1,
  publishedAt: "2010-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883937",
      externalLink: "https://www.themoviedb.org/tv/42942/season/1/episode/1",
    },
  ],
  title: "Departure",
  episodeType: "standard",
  stillPath: "/seOnRGCNCN8FR58a6VgEltscSvp.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:54:36.961Z",
  updatedAt: "2026-10-28T18:54:36.961Z",
} as const satisfies Episode
