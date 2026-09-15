import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornClapYourHands = {
  id: "01a0a59c-0a07-73ed-a1ae-fe8210127cdb",
  type: "track",
  slug: "sia-we-are-born-clap-your-hands",
  ownLength: 3.9744333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sYGPshMy9Rmp1818G1BQl",
      externalLink: "https://open.spotify.com/track/2sYGPshMy9Rmp1818G1BQl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Clap Your Hands",
} as const satisfies Track
