import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixCreepCreep = {
  id: "01a0a588-292b-7d27-a3dd-678edb504e47",
  type: "track",
  slug: "pentatonix-creep-creep",
  ownLength: 2.45,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-creep"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CawJOGy5RPJlxqffZ9Kip",
      externalLink: "https://open.spotify.com/track/2CawJOGy5RPJlxqffZ9Kip",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Creep",
} as const satisfies Track
