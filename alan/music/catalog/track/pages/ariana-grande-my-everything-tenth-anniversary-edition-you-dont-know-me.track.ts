import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionYouDontKnowMe = {
  id: "01a0a6c5-1808-78cb-b8cd-b5db1ab294cd",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-you-dont-know-me",
  ownLength: 3.8950833333333335,
  ownProgress: 3.8950833333333335,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Don't Know Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "youdontknowme|66CXWjxzNUsdJxJ2JdwvnR|233705",
  song: "song/ariana-grande-you-don-t-know-me",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 15,
      externalId: "3PCklyrrpEDpbSEzO5nPo0",
      externalLink: "https://open.spotify.com/track/3PCklyrrpEDpbSEzO5nPo0",
    },
  ],
} as const satisfies Track
