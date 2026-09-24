import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEndOfTimeEndOfTime = {
  id: "01a0aa7c-3ade-7279-b7cd-b05e871fc920",
  type: "page-type/track",
  slug: "zara-larsson-end-of-time-end-of-time",
  ownLength: 3.04155,
  ownProgress: 3.04155,
  partOfCollections: ["release/zara-larsson-end-of-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "End Of Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "endoftime|1Xylc3o4UrD53lo9CvFvVg|182493",
  song: "song/zara-larsson-end-of-time",
  carriedBy: [
    {
      release: "release/zara-larsson-end-of-time",
      discNumber: 1,
      position: 1,
      externalId: "1r3uphR9yQTbDAzVDhWX6D",
      externalLink: "https://open.spotify.com/track/1r3uphR9yQTbDAzVDhWX6D",
    },
  ],
} as const satisfies Track
