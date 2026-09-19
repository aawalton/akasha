import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyVivaldisRain = {
  id: "01a0abea-75b7-755f-a9ab-0e4baffc20f0",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-vivaldis-rain",
  ownLength: 2.187333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5IYKgT6BN80PTlA07bMbOy",
      externalLink: "https://open.spotify.com/track/5IYKgT6BN80PTlA07bMbOy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Vivaldi's Rain",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "vivaldisrain|6NWtt9pNOL2Gx7kBykdE5x|131240",
  song: "song/celtic-woman-vivaldis-rain",
} as const satisfies Track
