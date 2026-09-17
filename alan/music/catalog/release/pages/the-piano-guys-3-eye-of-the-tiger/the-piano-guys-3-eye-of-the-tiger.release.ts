import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3EyeOfTheTiger = {
  id: "01a0676a-d71d-7052-b924-ba4c37c72a31",
  type: "page-type/release",
  slug: "the-piano-guys-3-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 4.046083,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0JL9lTPU2NoJyNfjE0yxUX",
      externalLink: "https://open.spotify.com/album/0JL9lTPU2NoJyNfjE0yxUX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
} as const satisfies Release
