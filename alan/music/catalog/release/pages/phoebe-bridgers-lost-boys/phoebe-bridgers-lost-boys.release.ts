import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersLostBoys = {
  id: "01a0a198-5f1f-790e-9d5d-94ec08049a85",
  type: "release",
  slug: "phoebe-bridgers-lost-boys",
  ownLength: 4.243566666666666,
  ownProgress: 0,
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  publishedAt: "2026-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lJZpDWPKrfLjiY17OmwhP",
      externalLink: "https://open.spotify.com/album/7lJZpDWPKrfLjiY17OmwhP",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Lost Boys",
} as const satisfies Release
