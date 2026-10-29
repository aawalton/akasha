import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS09e01 = {
  id: "01a18844-d7f1-7eb0-86f1-7cb4967723d6",
  type: "page-type/episode",
  slug: "criminal-minds-s09e01",
  description:
    "The hunt for a methodical killer takes the BAU to Arizona to search for an increasingly devolving unsub, and the team speculates that Hotch is in the running to be the new BAU Section Chief following the death of Erin Strauss.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-9"],
  position: 1,
  publishedAt: "2013-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283449",
      externalLink: "https://www.themoviedb.org/tv/4057/season/9/episode/1",
    },
  ],
  title: "The Inspiration (1)",
  episodeType: "standard",
  stillPath: "/et9KRmVjntBe6FqIhFYDC0RoS4a.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
