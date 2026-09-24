import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextGhostin = {
  id: "01a0a6c5-2857-76e5-92de-160cc1de8890",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-ghostin",
  ownLength: 4.5244333333333335,
  ownProgress: 4.5244333333333335,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "ghostin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "ghostin|66CXWjxzNUsdJxJ2JdwvnR|271466",
  song: "song/ariana-grande-ghostin",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 8,
      externalId: "2vdBo4ALPYbHRUPKgtE5iC",
      externalLink: "https://open.spotify.com/track/2vdBo4ALPYbHRUPKgtE5iC",
    },
  ],
} as const satisfies Track
