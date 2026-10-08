import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunningWithTheWolves = {
  id: "01a0676a-d728-7031-a07d-488cad9163a6",
  type: "page-type/release",
  slug: "aurora-running-with-the-wolves",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2015-05-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QuAGL4XltYG8TEuviXlnq",
      externalLink: "https://open.spotify.com/album/4QuAGL4XltYG8TEuviXlnq",
    },
  ],
  title: "Running with the Wolves",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
