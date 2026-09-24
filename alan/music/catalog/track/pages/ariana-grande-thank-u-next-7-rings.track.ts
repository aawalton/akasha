import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNext7Rings = {
  id: "01a0a6c5-28a0-77eb-8fd3-c3ab520c36d6",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-7-rings",
  ownLength: 2.9771,
  ownProgress: 2.9771,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "7 rings",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "7rings|66CXWjxzNUsdJxJ2JdwvnR|178626",
  song: "song/ariana-grande-7-rings",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 10,
      externalId: "6ocbgoVGwYJhOv1GgI9NsF",
      externalLink: "https://open.spotify.com/track/6ocbgoVGwYJhOv1GgI9NsF",
    },
  ],
} as const satisfies Track
