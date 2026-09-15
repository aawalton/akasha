import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryMagic = {
  id: "01a0a5ae-b95c-7aa1-9d94-9d7ba2cea40a",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-magic",
  ownLength: 3.25155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48ynA8ip9UxxhWk43k0RXI",
      externalLink: "https://open.spotify.com/track/48ynA8ip9UxxhWk43k0RXI",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "magic",
} as const satisfies Track
