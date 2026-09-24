import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeShenandoah = {
  id: "01a0abea-5956-7a7c-aa9b-05c5503123d2",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-shenandoah",
  ownLength: 4.1171,
  ownProgress: 4.1171,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Shenandoah",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "shenandoah|6NWtt9pNOL2Gx7kBykdE5x|247026",
  song: "song/celtic-woman-shenandoah",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 9,
      externalId: "1DVeGmNt0WVYgBvyxTTkyR",
      externalLink: "https://open.spotify.com/track/1DVeGmNt0WVYgBvyxTTkyR",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "5Pl2TWrYtTvenhOog129Dc",
      externalLink: "https://open.spotify.com/track/5Pl2TWrYtTvenhOog129Dc",
    },
  ],
} as const satisfies Track
