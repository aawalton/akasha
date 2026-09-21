import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomEyesClosed = {
  id: "01a0c43f-b49a-7ca4-9843-79a68d8c0a16",
  type: "page-type/track",
  slug: "imagine-dragons-loom-eyes-closed",
  ownLength: 3.3337666666666665,
  ownProgress: 3.3337666666666665,
  partOfCollections: ["release/imagine-dragons-loom"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xDd7gl6AGgpiOz5trz4dM",
      externalLink: "https://open.spotify.com/track/7xDd7gl6AGgpiOz5trz4dM",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Eyes Closed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "eyesclosed|53XhwfbYqKCa1cC15pYq2q|200026",
  song: "song/imagine-dragons-eyes-closed",
} as const satisfies Track
