import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTakeTheReinsTakeTheReins = {
  id: "01a0b112-95d5-704c-bce0-e4e80e252e75",
  type: "page-type/track",
  slug: "vinny-marchi-take-the-reins-take-the-reins",
  ownLength: 2.669233333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-take-the-reins"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3T5qpu2NWLeKFobTBKpapI",
      externalLink: "https://open.spotify.com/track/3T5qpu2NWLeKFobTBKpapI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Take The Reins",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "takethereins|5USAMqcbMAzF3HBmeD5pJF|160154",
  song: "song/vinny-marchi-take-the-reins",
} as const satisfies Track
