import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYesAndRemixes = {
  id: "01a0676a-d731-704f-9cbe-feaff57f4cc6",
  type: "page-type/release",
  slug: "ariana-grande-yes-and-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kHBlnc69hLOSyXAZn2yeX",
      externalLink: "https://open.spotify.com/album/0kHBlnc69hLOSyXAZn2yeX",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "yes, and? (remixes)",
} as const satisfies Release
