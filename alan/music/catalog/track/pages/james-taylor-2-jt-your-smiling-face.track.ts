import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtYourSmilingFace = {
  id: "01a0abeb-45d5-732e-8dce-ea0e043da537",
  type: "page-type/track",
  slug: "james-taylor-2-jt-your-smiling-face",
  ownLength: 2.7856833333333335,
  ownProgress: 2.7856833333333335,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Smiling Face",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "yoursmilingface|0vn7UBvSQECKJm2817Yf1P|167141",
  song: "song/james-taylor-your-smiling-face",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 1,
      externalId: "1Q34tAtTWI6RdW1qzFQiPb",
      externalLink: "https://open.spotify.com/track/1Q34tAtTWI6RdW1qzFQiPb",
    },
  ],
} as const satisfies Track
