import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationDulaman = {
  id: "01a0abea-5561-7f0c-8cb2-cc514a1428f9",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-dulaman",
  ownLength: 3.1251,
  ownProgress: 3.1251,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dúlaman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|187506",
  song: "song/celtic-woman-dulaman",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 4,
      externalId: "25OHOO9KhiBkz5OIKSousc",
      externalLink: "https://open.spotify.com/track/25OHOO9KhiBkz5OIKSousc",
    },
  ],
} as const satisfies Track
