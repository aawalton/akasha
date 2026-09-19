import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMeetUThereMeetUThere = {
  id: "01a0b112-9bf4-72f5-b7b3-742b09ec1875",
  type: "page-type/track",
  slug: "vinny-marchi-meet-u-there-meet-u-there",
  ownLength: 2.8,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-meet-u-there"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0EalDy2yJzKpjUfIxlcXgS",
      externalLink: "https://open.spotify.com/track/0EalDy2yJzKpjUfIxlcXgS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "meet U there",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "meetuthere|5USAMqcbMAzF3HBmeD5pJF|168000",
  song: "song/vinny-marchi-meet-u-there",
} as const satisfies Track
