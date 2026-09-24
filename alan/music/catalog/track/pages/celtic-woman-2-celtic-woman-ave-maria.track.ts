import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanAveMaria = {
  id: "01a0abea-78c6-76fa-9728-0b364ecf2912",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-ave-maria",
  ownLength: 2.8848833333333332,
  ownProgress: 2.8848833333333332,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ave Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "avemaria|6NWtt9pNOL2Gx7kBykdE5x|173093",
  song: "song/celtic-woman-ave-maria",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 6,
      externalId: "4H6sxd2yQFmErBRl8cZIUi",
      externalLink: "https://open.spotify.com/track/4H6sxd2yQFmErBRl8cZIUi",
    },
  ],
} as const satisfies Track
