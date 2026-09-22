import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeLeaveMeAlone = {
  id: "01a0caa8-fd3d-7479-87f7-f11777c0f64c",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-leave-me-alone",
  ownLength: 2.3623,
  ownProgress: 2.3623,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Leave Me Alone",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "leavemealone|2hUYKu1x0UZQXvzCmggvSn|141738",
  song: "song/renee-rapp-leave-me-alone",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 1,
      externalId: "44t9rTRjK82lBbZwuePQOE",
      externalLink: "https://open.spotify.com/track/44t9rTRjK82lBbZwuePQOE",
    },
  ],
} as const satisfies Track
