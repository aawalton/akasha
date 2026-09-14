import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const siaReasonableWoman = {
  id: "01a0676a-d727-7057-a8e0-eca5fc478c28",
  type: "release",
  slug: "sia-reasonable-woman",
  title: "Reasonable Woman",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 52.8199,
  ownProgress: 52.8199,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-05-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JYsCq8rOuQXkwv9BtJEa8",
      externalLink: "https://open.spotify.com/album/2JYsCq8rOuQXkwv9BtJEa8",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
