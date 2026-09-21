import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiPoserRemasteredComeOnComeOnRemastered = {
  id: "01a0b112-98c0-7712-8519-6825d2e8083c",
  type: "page-type/track",
  slug: "vinny-marchi-poser-remastered-come-on-come-on-remastered",
  ownLength: 2.482083333333333,
  ownProgress: 2.482083333333333,
  partOfCollections: ["release/vinny-marchi-poser-remastered"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Kxn9BGaO7bHLlnBWJiuvu",
      externalLink: "https://open.spotify.com/track/3Kxn9BGaO7bHLlnBWJiuvu",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Come On! Come On! - remastered",
  trackType: "remaster",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "comeoncomeonremastered|5USAMqcbMAzF3HBmeD5pJF|148925",
  song: "song/vinny-marchi-come-on-come-on",
  carriedBy: [
    {
      release: "release/vinny-marchi-poser-remastered",
      discNumber: 1,
      position: 4,
      externalId: "3Kxn9BGaO7bHLlnBWJiuvu",
      externalLink: "https://open.spotify.com/track/3Kxn9BGaO7bHLlnBWJiuvu",
    },
  ],
} as const satisfies Track
