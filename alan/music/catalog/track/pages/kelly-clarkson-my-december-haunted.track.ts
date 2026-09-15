import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHaunted = {
  id: "01a0a5ae-ca0e-7d27-be12-e17f1ac58e9a",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-haunted",
  ownLength: 3.3013333333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36cGlH8HC3LGEkj0vDSA5b",
      externalLink: "https://open.spotify.com/track/36cGlH8HC3LGEkj0vDSA5b",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Haunted",
} as const satisfies Track
