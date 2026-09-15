import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersSmokeSignals = {
  id: "01a0676a-d729-7037-b852-fc17be1af155",
  type: "page-type/release",
  slug: "phoebe-bridgers-smoke-signals",
  title: "Smoke Signals",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 5.395183,
  ownProgress: 5.395183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-01-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6gouZs8Y2Tx6NVF1zr4hof",
      externalLink: "https://open.spotify.com/album/6gouZs8Y2Tx6NVF1zr4hof",
    },
  ],
} as const satisfies Release
