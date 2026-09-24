import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandBeStill = {
  id: "01a0abea-5d77-74f0-9894-3f728f8f71af",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-be-still",
  ownLength: 1.5942166666666666,
  ownProgress: 1.5942166666666666,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land",
    "release/celtic-woman-2-ancient-land-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Be Still",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "bestill|6NWtt9pNOL2Gx7kBykdE5x|95653",
  song: "song/celtic-woman-be-still",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 15,
      externalId: "6bTXuFObHePIXTAwp22NoQ",
      externalLink: "https://open.spotify.com/track/6bTXuFObHePIXTAwp22NoQ",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "2YwrKRaCR14nhMTEwFE96r",
      externalLink: "https://open.spotify.com/track/2YwrKRaCR14nhMTEwFE96r",
    },
  ],
} as const satisfies Track
