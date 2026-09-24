import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationISeeFire = {
  id: "01a0abea-562a-7bbc-89cc-fb16bb709d18",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-i-see-fire",
  ownLength: 5.15155,
  ownProgress: 5.15155,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "I See Fire",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "iseefire|6NWtt9pNOL2Gx7kBykdE5x|309093",
  song: "song/celtic-woman-i-see-fire",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 11,
      externalId: "2IS1snn7mqeQB2CYCvsPQo",
      externalLink: "https://open.spotify.com/track/2IS1snn7mqeQB2CYCvsPQo",
    },
  ],
} as const satisfies Track
