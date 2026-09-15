import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsDaughterFromHell = {
  id: "01a0a198-87e3-7716-a319-e854710a9112",
  type: "release",
  slug: "gracie-abrams-daughter-from-hell",
  ownLength: 56.26056666666667,
  ownProgress: 0,
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  publishedAt: "2026-07-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BZydSQMfJNphTFZzyIxh5",
      externalLink: "https://open.spotify.com/album/4BZydSQMfJNphTFZzyIxh5",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Daughter from Hell",
} as const satisfies Release
