import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiStereo = {
  id: "01a0676a-d72a-701e-83a3-6c79d933cc75",
  type: "page-type/release",
  slug: "emei-stereo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2025-07-11",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0znufLvqCiP9LblUItyAeQ",
      externalLink: "https://open.spotify.com/album/0znufLvqCiP9LblUItyAeQ",
    },
  ],
  title: "Stereo",
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
