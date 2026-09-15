import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaThisIsActingDeluxeVersionTheGreatest = {
  id: "01a0a59c-079d-74a9-9dff-5b39a46c722e",
  type: "page-type/track",
  slug: "sia-this-is-acting-deluxe-version-the-greatest",
  ownLength: 3.5151,
  ownProgress: 0,
  partOfCollections: ["release/sia-this-is-acting-deluxe-version"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bLopGnirdrilrpdVB6Um1",
      externalLink: "https://open.spotify.com/track/6bLopGnirdrilrpdVB6Um1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Greatest",
} as const satisfies Track
