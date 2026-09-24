import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarder = {
  id: "01a0a6c5-3c20-7ecd-a303-f145b486f8ec",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder",
  ownLength: 3.9340166666666665,
  ownProgress: 3.9340166666666665,
  partOfCollections: [
    "release/ariana-grande-love-me-harder",
    "release/ariana-grande-my-everything-tenth-anniversary-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Harder",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "The Weeknd" }],
  trackKey: "lovemeharder|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|236041",
  song: "song/ariana-grande-love-me-harder",
  carriedBy: [
    {
      release: "release/ariana-grande-love-me-harder",
      discNumber: 1,
      position: 1,
      externalId: "7HE1FnMtSsRotzIAQPXpr5",
      externalLink: "https://open.spotify.com/track/7HE1FnMtSsRotzIAQPXpr5",
    },
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 9,
      externalId: "2Pm40TLDw6G78thGOdsJW7",
      externalLink: "https://open.spotify.com/track/2Pm40TLDw6G78thGOdsJW7",
    },
  ],
} as const satisfies Track
