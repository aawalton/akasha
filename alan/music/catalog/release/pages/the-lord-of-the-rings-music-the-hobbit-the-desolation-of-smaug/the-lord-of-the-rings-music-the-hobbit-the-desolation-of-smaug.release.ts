import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theLordOfTheRingsMusicTheHobbitTheDesolationOfSmaug = {
  id: "01a0676a-d72d-7026-b3dc-a2f90acc7121",
  type: "page-type/release",
  slug: "the-lord-of-the-rings-music-the-hobbit-the-desolation-of-smaug",
  title:
    "The Hobbit: The Desolation of Smaug (Original Motion Picture Soundtrack) [Special Edition]",
  partOfCollections: ["release-collection/the-lord-of-the-rings-music"],
  position: 5,
  ownLength: 129.532117,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MCUHjDo3wSm2QuLh1Fyrf",
      externalLink: "https://open.spotify.com/album/3MCUHjDo3wSm2QuLh1Fyrf",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
