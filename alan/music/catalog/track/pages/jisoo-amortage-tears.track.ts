import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageTears = {
  id: "01a0afa2-7352-7059-9046-7acbd9be28a1",
  type: "page-type/track",
  slug: "jisoo-amortage-tears",
  ownLength: 3.0370166666666667,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-amortage"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08fvSPSKjoF4vmoEtcGain",
      externalLink: "https://open.spotify.com/track/08fvSPSKjoF4vmoEtcGain",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "TEARS",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "tears|6UZ0ba50XreR4TM8u322gs|182221",
} as const satisfies Track
