import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanSiDoMhaimeoILive = {
  id: "01a0abea-7a5a-7b73-adc2-da98f59ebbef",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-si-do-mhaimeo-i-live",
  ownLength: 2.2208833333333335,
  ownProgress: 2.2208833333333335,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7BsL26icVm1H53xLAw5tvC",
      externalLink: "https://open.spotify.com/track/7BsL26icVm1H53xLAw5tvC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Si Do Mhaimeo I - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "sidomhaimeoilive|6NWtt9pNOL2Gx7kBykdE5x|133253",
  song: "song/celtic-woman-si-do-mhaimeo-i",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 18,
      externalId: "7BsL26icVm1H53xLAw5tvC",
      externalLink: "https://open.spotify.com/track/7BsL26icVm1H53xLAw5tvC",
    },
  ],
} as const satisfies Track
