import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooClickClick = {
  id: "01a0afa2-71d6-7a6b-b30e-e1c172f0e4d3",
  type: "page-type/track",
  slug: "jisoo-click-click",
  ownLength: 2.6515833333333334,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-click"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zyNO73bPNPC6KBi3raNmZ",
      externalLink: "https://open.spotify.com/track/1zyNO73bPNPC6KBi3raNmZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "CLICK",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "click|6UZ0ba50XreR4TM8u322gs|159095",
  song: "song/jisoo-click",
} as const satisfies Track
