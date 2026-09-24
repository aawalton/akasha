import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyNewgrange = {
  id: "01a0abea-7474-7104-8de0-45bbe3043366",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-newgrange",
  ownLength: 3.1251,
  ownProgress: 3.1251,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Newgrange",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "newgrange|6NWtt9pNOL2Gx7kBykdE5x|187506",
  song: "song/celtic-woman-newgrange",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 3,
      externalId: "5N5sHFKi47SjQASUnxNZVO",
      externalLink: "https://open.spotify.com/track/5N5sHFKi47SjQASUnxNZVO",
    },
  ],
} as const satisfies Track
