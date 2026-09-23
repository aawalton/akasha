import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreAndTheHoundReprise = {
  id: "01a0676a-d717-701a-be3d-bbfa375e2fe7",
  type: "page-type/release",
  slug: "yaelokre-and-the-hound-reprise",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2026-01-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "048OiuY493d6ayD7k37QeS",
      externalLink: "https://open.spotify.com/album/048OiuY493d6ayD7k37QeS",
      lastSyncedAt: "2026-01-31",
    },
  ],
  title: "And the Hound (Reprise)",
} as const satisfies Release
