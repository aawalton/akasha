import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryET = {
  id: "01a0676a-d71c-7048-9988-9f3256de4b8a",
  type: "page-type/release",
  slug: "katy-perry-e-t",
  title: "E.T.",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 0.476633,
  ownProgress: 0.476633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6cV5RZ57OBWPkjNt1D19Hj",
      externalLink: "https://open.spotify.com/album/6cV5RZ57OBWPkjNt1D19Hj",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
