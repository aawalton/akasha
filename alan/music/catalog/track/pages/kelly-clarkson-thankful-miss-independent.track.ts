import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulMissIndependent = {
  id: "01a0a5ae-ccad-7fcd-8b68-5afa26fd626c",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-miss-independent",
  ownLength: 3.5797666666666665,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CZi8d774dBB0wiuWMIpr8",
      externalLink: "https://open.spotify.com/track/2CZi8d774dBB0wiuWMIpr8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Miss Independent",
} as const satisfies Track
