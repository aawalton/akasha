import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleChasingPavements = {
  id: "01a0676a-d71a-701e-9e79-5a4e675238b7",
  type: "page-type/release",
  slug: "adele-chasing-pavements",
  title: "Chasing Pavements",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-01-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Kclo2Kmw2v94UqKwZam8F",
      externalLink: "https://open.spotify.com/album/5Kclo2Kmw2v94UqKwZam8F",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
