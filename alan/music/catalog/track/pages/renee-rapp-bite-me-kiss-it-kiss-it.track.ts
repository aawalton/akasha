import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeKissItKissIt = {
  id: "01a0caa8-fe76-7fac-90d1-ca41b4285d06",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-kiss-it-kiss-it",
  ownLength: 2.872,
  ownProgress: 2.872,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kiss It Kiss It",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "kissitkissit|2hUYKu1x0UZQXvzCmggvSn|172320",
  song: "song/renee-rapp-kiss-it-kiss-it",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 5,
      externalId: "0kvklDSNAkcENUPfEvQNvC",
      externalLink: "https://open.spotify.com/track/0kvklDSNAkcENUPfEvQNvC",
    },
  ],
} as const satisfies Track
