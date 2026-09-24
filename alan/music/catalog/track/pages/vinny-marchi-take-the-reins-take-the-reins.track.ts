import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTakeTheReinsTakeTheReins = {
  id: "01a0b112-95d5-704c-bce0-e4e80e252e75",
  type: "page-type/track",
  slug: "vinny-marchi-take-the-reins-take-the-reins",
  ownLength: 2.669233333333333,
  ownProgress: 2.669233333333333,
  partOfCollections: ["release/vinny-marchi-take-the-reins"],
  status: "completed",
  unit: "unit/minutes",
  title: "Take The Reins",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "takethereins|5USAMqcbMAzF3HBmeD5pJF|160154",
  song: "song/vinny-marchi-take-the-reins",
  carriedBy: [
    {
      release: "release/vinny-marchi-take-the-reins",
      discNumber: 1,
      position: 1,
      externalId: "3T5qpu2NWLeKFobTBKpapI",
      externalLink: "https://open.spotify.com/track/3T5qpu2NWLeKFobTBKpapI",
    },
  ],
} as const satisfies Track
