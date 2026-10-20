import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaSavedMyLife = {
  id: "01a0676a-d728-7045-a39e-387e554313f6",
  type: "page-type/release",
  slug: "sia-saved-my-life",
  title: "Saved My Life",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kKYFo3YmUCRmT1tUj31wp",
      externalLink: "https://open.spotify.com/album/1kKYFo3YmUCRmT1tUj31wp",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
