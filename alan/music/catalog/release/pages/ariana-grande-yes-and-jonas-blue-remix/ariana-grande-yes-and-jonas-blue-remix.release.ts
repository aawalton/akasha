import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYesAndJonasBlueRemix = {
  id: "01a0676a-d731-704e-a67d-2f6c7d4077da",
  type: "page-type/release",
  slug: "ariana-grande-yes-and-jonas-blue-remix",
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
      externalId: "0RhZMUvozZXn2at1sfSogT",
      externalLink: "https://open.spotify.com/album/0RhZMUvozZXn2at1sfSogT",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "yes, and? (Jonas Blue Remix)",
} as const satisfies Release
