import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomEyesClosed = {
  id: "01a0c43f-b49a-7ca4-9843-79a68d8c0a16",
  type: "page-type/track",
  slug: "imagine-dragons-loom-eyes-closed",
  ownLength: 3.3337666666666665,
  ownProgress: 3.3337666666666665,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eyes Closed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "eyesclosed|53XhwfbYqKCa1cC15pYq2q|200026",
  song: "song/imagine-dragons-eyes-closed",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 3,
      externalId: "7xDd7gl6AGgpiOz5trz4dM",
      externalLink: "https://open.spotify.com/track/7xDd7gl6AGgpiOz5trz4dM",
    },
  ],
} as const satisfies Track
