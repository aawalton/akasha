import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleColdShoulder = {
  id: "01a0676a-d71b-700b-9443-a2951fb0d20c",
  type: "page-type/release",
  slug: "adele-cold-shoulder",
  title: "Cold Shoulder",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-04-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JjVwFhBHZTMJTSAIACvn4",
      externalLink: "https://open.spotify.com/album/4JjVwFhBHZTMJTSAIACvn4",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
