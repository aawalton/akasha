import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomWakeUp = {
  id: "01a0c43f-b451-7e30-9dcb-07233255c150",
  type: "page-type/track",
  slug: "imagine-dragons-loom-wake-up",
  ownLength: 2.7784333333333335,
  ownProgress: 2.7784333333333335,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wake Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "wakeup|53XhwfbYqKCa1cC15pYq2q|166706",
  song: "song/imagine-dragons-wake-up",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 1,
      externalId: "6BOgN046AFobs2sZV7YlRy",
      externalLink: "https://open.spotify.com/track/6BOgN046AFobs2sZV7YlRy",
    },
  ],
} as const satisfies Track
