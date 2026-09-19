import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiDrivingMePsychoDrivingMePsycho = {
  id: "01a0b112-9af1-75b2-b960-d10037243296",
  type: "page-type/track",
  slug: "vinny-marchi-driving-me-psycho-driving-me-psycho",
  ownLength: 3.4726833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-driving-me-psycho"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jwxG2fGcgTRirSDOXTEqO",
      externalLink: "https://open.spotify.com/track/2jwxG2fGcgTRirSDOXTEqO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "DRIVING ME PSYCHO",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "drivingmepsycho|5USAMqcbMAzF3HBmeD5pJF|208361",
  song: "song/vinny-marchi-driving-me-psycho",
} as const satisfies Track
