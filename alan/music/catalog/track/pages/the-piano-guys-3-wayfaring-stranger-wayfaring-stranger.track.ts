import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WayfaringStrangerWayfaringStranger = {
  id: "01a0afa2-1cc7-7a88-961b-2e90a959781d",
  type: "page-type/track",
  slug: "the-piano-guys-3-wayfaring-stranger-wayfaring-stranger",
  ownLength: 3.8780833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wayfaring-stranger"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CPQpB7u7ieoxNwy2l2go1",
      externalLink: "https://open.spotify.com/track/0CPQpB7u7ieoxNwy2l2go1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Wayfaring Stranger",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "1GRl6sRyLg9ToOohIE2wW5", artistName: "The Tabernacle Choir at Temple Square" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2Zpql3RdMQjunbDKk1bIiz", artistName: "Mack Wilberg" },
    { externalId: "4kAIRZipPTtTbZBTudxcEA", artistName: "Orchestra at Temple Square" },
  ],
  trackKey:
    "wayfaringstranger|0jW6R8CVyVohuUJVcuweDI,1GRl6sRyLg9ToOohIE2wW5,1U5zgr455OGyIkLNXvDdrf,2Zpql3RdMQjunbDKk1bIiz,4kAIRZipPTtTbZBTudxcEA|232685",
  song: "song/the-piano-guys-wayfaring-stranger",
} as const satisfies Track
