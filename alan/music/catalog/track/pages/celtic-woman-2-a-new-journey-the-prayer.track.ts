import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyThePrayer = {
  id: "01a0abea-7458-78a5-aaa2-cf4238f0cc2f",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-prayer",
  ownLength: 4.326216666666666,
  ownProgress: 4.326216666666666,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "theprayer|6NWtt9pNOL2Gx7kBykdE5x|259573",
  song: "song/celtic-woman-the-prayer",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 2,
      externalId: "3sJ2sVxfWZJFM7OBSQCNFy",
      externalLink: "https://open.spotify.com/track/3sJ2sVxfWZJFM7OBSQCNFy",
    },
  ],
} as const satisfies Track
