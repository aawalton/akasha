import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyBeanPhaidin = {
  id: "01a0abea-6952-71d7-bbbf-827cc0cccc98",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-bean-phaidin",
  ownLength: 3.506483333333333,
  ownProgress: 3.506483333333333,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bean Pháidín",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "beanphaidin|6NWtt9pNOL2Gx7kBykdE5x|210389",
  song: "song/celtic-woman-bean-phaidin",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 11,
      externalId: "4Fge3caJzss3mKMVtbehur",
      externalLink: "https://open.spotify.com/track/4Fge3caJzss3mKMVtbehur",
    },
  ],
} as const satisfies Track
