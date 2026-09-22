import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxSalemWitch = {
  id: "01a0c95d-fbd8-7bbb-91dd-a094296bcb03",
  type: "page-type/release",
  slug: "lilith-max-salem-witch",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2026-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yrw9AUJnHajXOtfNnHSA2",
      externalLink: "https://open.spotify.com/album/5yrw9AUJnHajXOtfNnHSA2",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Salem Witch",
} as const satisfies Release
