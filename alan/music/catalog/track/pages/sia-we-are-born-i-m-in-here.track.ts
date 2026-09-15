import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornIMInHere = {
  id: "01a0a59c-0afe-7219-97e6-f23669604502",
  type: "track",
  slug: "sia-we-are-born-i-m-in-here",
  ownLength: 3.6886666666666668,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07OLYWQfwfJKJIwO1heCME",
      externalLink: "https://open.spotify.com/track/07OLYWQfwfJKJIwO1heCME",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I'm In Here",
} as const satisfies Track
