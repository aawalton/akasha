import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeShy = {
  id: "01a0caa8-ff40-7fbe-b1a3-447aabe996f9",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-shy",
  ownLength: 3.2043333333333335,
  ownProgress: 3.2043333333333335,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "shy|2hUYKu1x0UZQXvzCmggvSn|192260",
  song: "song/renee-rapp-shy",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 8,
      externalId: "2N6md2JtrNake4sJ14KJ72",
      externalLink: "https://open.spotify.com/track/2N6md2JtrNake4sJ14KJ72",
    },
  ],
} as const satisfies Track
