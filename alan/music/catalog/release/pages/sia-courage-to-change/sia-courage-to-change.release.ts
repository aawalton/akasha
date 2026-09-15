import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaCourageToChange = {
  id: "01a0676a-d71b-702e-a136-d9f0aa65619e",
  type: "page-type/release",
  slug: "sia-courage-to-change",
  title: "Courage to Change",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 4.8776,
  ownProgress: 4.8776,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-09-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09bnoLaXqJi7naZtDXHIbh",
      externalLink: "https://open.spotify.com/album/09bnoLaXqJi7naZtDXHIbh",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
