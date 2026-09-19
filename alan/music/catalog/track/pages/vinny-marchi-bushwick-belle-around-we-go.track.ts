import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleAroundWeGo = {
  id: "01a0b112-8f72-7d74-8d33-a96dbb91dfd8",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-around-we-go",
  ownLength: 2.8903833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2WPlD94fcn593aogYP0vLm",
      externalLink: "https://open.spotify.com/track/2WPlD94fcn593aogYP0vLm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Around We Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "aroundwego|5USAMqcbMAzF3HBmeD5pJF|173423",
  song: "song/vinny-marchi-around-we-go",
} as const satisfies Track
