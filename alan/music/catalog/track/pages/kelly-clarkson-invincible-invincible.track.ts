import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonInvincibleInvincible = {
  id: "01a0a5ae-dde2-72b6-829a-2ff612a32a98",
  type: "track",
  slug: "kelly-clarkson-invincible-invincible",
  ownLength: 3.97265,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-invincible"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cOi1w3MoljmLhoTDMDkC9",
      externalLink: "https://open.spotify.com/track/7cOi1w3MoljmLhoTDMDkC9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Invincible",
} as const satisfies Track
