import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationTheVoice = {
  id: "01a0abea-55b6-7756-a883-1faea43928fb",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-the-voice",
  ownLength: 3.1542166666666667,
  ownProgress: 3.1542166666666667,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Voice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thevoice|6NWtt9pNOL2Gx7kBykdE5x|189253",
  song: "song/celtic-woman-the-voice",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 7,
      externalId: "4GqP0wqFPUMxdfxYlNdegr",
      externalLink: "https://open.spotify.com/track/4GqP0wqFPUMxdfxYlNdegr",
    },
  ],
} as const satisfies Track
