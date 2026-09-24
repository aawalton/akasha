import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextInMyHead = {
  id: "01a0a6c5-287c-7b60-b833-10a914a71330",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-in-my-head",
  ownLength: 3.7157666666666667,
  ownProgress: 3.7157666666666667,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "in my head",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "inmyhead|66CXWjxzNUsdJxJ2JdwvnR|222946",
  song: "song/ariana-grande-in-my-head",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 9,
      externalId: "4T652DlATVHe0jdLKaN3Bw",
      externalLink: "https://open.spotify.com/track/4T652DlATVHe0jdLKaN3Bw",
    },
  ],
} as const satisfies Track
