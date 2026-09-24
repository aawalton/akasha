import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleAroundWeGo = {
  id: "01a0b112-8f72-7d74-8d33-a96dbb91dfd8",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-around-we-go",
  ownLength: 2.8903833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Around We Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "aroundwego|5USAMqcbMAzF3HBmeD5pJF|173423",
  song: "song/vinny-marchi-around-we-go",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 7,
      externalId: "2WPlD94fcn593aogYP0vLm",
      externalLink: "https://open.spotify.com/track/2WPlD94fcn593aogYP0vLm",
    },
  ],
} as const satisfies Track
