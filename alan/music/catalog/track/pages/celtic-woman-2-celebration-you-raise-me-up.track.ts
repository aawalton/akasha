import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationYouRaiseMeUp = {
  id: "01a0abea-557e-7a4c-9b82-8b526919c961",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-you-raise-me-up",
  ownLength: 4.7291,
  ownProgress: 4.7291,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Raise Me Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "youraisemeup|6NWtt9pNOL2Gx7kBykdE5x|283746",
  song: "song/celtic-woman-you-raise-me-up",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 5,
      externalId: "1HDFGwFL9AIAxBidsFuhlb",
      externalLink: "https://open.spotify.com/track/1HDFGwFL9AIAxBidsFuhlb",
    },
  ],
} as const satisfies Track
