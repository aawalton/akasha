import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleBushwickBelle = {
  id: "01a0b112-8f07-72e5-810f-ed71465e8c1b",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-bushwick-belle",
  ownLength: 3.40475,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ewCnzZGuip2nh2qTFgLl3",
      externalLink: "https://open.spotify.com/track/6ewCnzZGuip2nh2qTFgLl3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bushwick Belle",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "bushwickbelle|5USAMqcbMAzF3HBmeD5pJF|204285",
  song: "song/vinny-marchi-bushwick-belle",
} as const satisfies Track
