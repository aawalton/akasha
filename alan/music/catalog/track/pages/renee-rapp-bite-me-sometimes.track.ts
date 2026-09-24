import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeSometimes = {
  id: "01a0caa8-fe30-7251-bd44-86709308b608",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-sometimes",
  ownLength: 3.06235,
  ownProgress: 3.06235,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sometimes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "sometimes|2hUYKu1x0UZQXvzCmggvSn|183741",
  song: "song/renee-rapp-sometimes",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 4,
      externalId: "1daFcmkDEXxCNZIBINQ3Ui",
      externalLink: "https://open.spotify.com/track/1daFcmkDEXxCNZIBINQ3Ui",
    },
  ],
} as const satisfies Track
