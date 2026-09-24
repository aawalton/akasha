import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SpancilHillSpancilHill = {
  id: "01a0abea-7ac0-7a08-84c2-6640f2734422",
  type: "page-type/track",
  slug: "celtic-woman-2-spancil-hill-spancil-hill",
  ownLength: 3.308333333333333,
  ownProgress: 3.308333333333333,
  partOfCollections: ["release/celtic-woman-2-spancil-hill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Spancil Hill",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "spancilhill|6NWtt9pNOL2Gx7kBykdE5x|198500",
  song: "song/celtic-woman-spancil-hill",
  carriedBy: [
    {
      release: "release/celtic-woman-2-spancil-hill",
      discNumber: 1,
      position: 1,
      externalId: "2GLg6Dlgw13oYmAPi4c45m",
      externalLink: "https://open.spotify.com/track/2GLg6Dlgw13oYmAPi4c45m",
    },
  ],
} as const satisfies Track
