import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveYourSmilingFace = {
  id: "01a0abeb-3c22-797b-bfdc-a15c69d46c97",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-your-smiling-face",
  ownLength: 2.891766666666667,
  ownProgress: 2.891766666666667,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Smiling Face",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "yoursmilingface|0vn7UBvSQECKJm2817Yf1P|173506",
  song: "song/james-taylor-your-smiling-face",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 4,
      externalId: "0qWeTfa2rF6Q0KICiGjr3j",
      externalLink: "https://open.spotify.com/track/0qWeTfa2rF6Q0KICiGjr3j",
    },
  ],
} as const satisfies Track
