import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillNotJustOnChristmas = {
  id: "01a0a6c5-3a47-7e7b-ac93-9a403435d4e0",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-not-just-on-christmas",
  ownLength: 2.0457666666666667,
  ownProgress: 2.0457666666666667,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Not Just On Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "notjustonchristmas|66CXWjxzNUsdJxJ2JdwvnR|122746",
  song: "song/ariana-grande-not-just-on-christmas",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 4,
      externalId: "29SZX6DJdXnFEV2a34qAm4",
      externalLink: "https://open.spotify.com/track/29SZX6DJdXnFEV2a34qAm4",
    },
  ],
} as const satisfies Track
