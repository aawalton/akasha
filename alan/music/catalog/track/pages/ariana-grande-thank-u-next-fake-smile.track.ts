import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextFakeSmile = {
  id: "01a0a6c5-27e9-755b-9c47-f4fbb2f1cad7",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-fake-smile",
  ownLength: 3.481333333333333,
  ownProgress: 3.481333333333333,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "fake smile",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "fakesmile|66CXWjxzNUsdJxJ2JdwvnR|208880",
  song: "song/ariana-grande-fake-smile",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 5,
      externalId: "3wFLWP0FcIqHK1wb1CPthQ",
      externalLink: "https://open.spotify.com/track/3wFLWP0FcIqHK1wb1CPthQ",
    },
  ],
} as const satisfies Track
