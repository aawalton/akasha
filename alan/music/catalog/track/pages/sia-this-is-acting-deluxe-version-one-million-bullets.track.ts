import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaThisIsActingDeluxeVersionOneMillionBullets = {
  id: "01a0a59c-05b6-74de-967d-6d21a964251a",
  type: "page-type/track",
  slug: "sia-this-is-acting-deluxe-version-one-million-bullets",
  ownLength: 4.2011,
  ownProgress: 0,
  partOfCollections: ["release/sia-this-is-acting-deluxe-version"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CGFyZ5fSRo0DhIJOLdHVM",
      externalLink: "https://open.spotify.com/track/1CGFyZ5fSRo0DhIJOLdHVM",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Million Bullets",
} as const satisfies Track
