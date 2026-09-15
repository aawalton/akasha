import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansAnywhereIs = {
  id: "01a0a5b0-2c0c-70c9-bb91-1e30431ecf07",
  type: "page-type/track",
  slug: "enya-oceans-anywhere-is",
  ownLength: 3.744883333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uQqPi6zRy3I5S2INq7x5l",
      externalLink: "https://open.spotify.com/track/7uQqPi6zRy3I5S2INq7x5l",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Anywhere Is",
} as const satisfies Track
