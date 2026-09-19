import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNext7Rings = {
  id: "01a0a6c5-28a0-77eb-8fd3-c3ab520c36d6",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-7-rings",
  ownLength: 2.9771,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ocbgoVGwYJhOv1GgI9NsF",
      externalLink: "https://open.spotify.com/track/6ocbgoVGwYJhOv1GgI9NsF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "7 rings",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "7rings|66CXWjxzNUsdJxJ2JdwvnR|178626",
  song: "song/ariana-grande-7-rings",
} as const satisfies Track
