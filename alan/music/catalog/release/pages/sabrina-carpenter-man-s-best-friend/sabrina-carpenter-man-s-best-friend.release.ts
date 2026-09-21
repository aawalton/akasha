import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterManSBestFriend = {
  id: "01a0676a-d724-7033-88ec-e81ee0e4b2b8",
  type: "page-type/release",
  slug: "sabrina-carpenter-man-s-best-friend",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2025-08-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aqg30bNvLSWgShZgX4oop",
      externalLink: "https://open.spotify.com/album/1aqg30bNvLSWgShZgX4oop",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Man’s Best Friend",
} as const satisfies Release
