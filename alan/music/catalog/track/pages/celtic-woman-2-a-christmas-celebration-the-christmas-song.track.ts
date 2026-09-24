import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationTheChristmasSong = {
  id: "01a0abea-76fc-7293-8a5f-10c964008809",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-the-christmas-song",
  ownLength: 3.596,
  ownProgress: 3.596,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Christmas Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thechristmassong|6NWtt9pNOL2Gx7kBykdE5x|215760",
  song: "song/celtic-woman-the-christmas-song",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-christmas-celebration",
      discNumber: 1,
      position: 7,
      externalId: "1S0OZ3pdQohICDTJToDU8O",
      externalLink: "https://open.spotify.com/track/1S0OZ3pdQohICDTJToDU8O",
    },
  ],
} as const satisfies Track
