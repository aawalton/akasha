import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyWhenYouGo = {
  id: "01a0abea-6996-723e-9369-992ad6406ed0",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-when-you-go",
  ownLength: 3.4861333333333335,
  ownProgress: 3.4861333333333335,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "When You Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "whenyougo|6NWtt9pNOL2Gx7kBykdE5x|209168",
  song: "song/celtic-woman-when-you-go",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 13,
      externalId: "4dvyIYRaZ0RFmn9ApWTCwU",
      externalLink: "https://open.spotify.com/track/4dvyIYRaZ0RFmn9ApWTCwU",
    },
  ],
} as const satisfies Track
