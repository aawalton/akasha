import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeNewgrange = {
  id: "01a0abea-5a9b-7b1d-9322-e764f3da8a8d",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-newgrange",
  ownLength: 3.75955,
  ownProgress: 3.75955,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Newgrange",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "newgrange|6NWtt9pNOL2Gx7kBykdE5x|225573",
  song: "song/celtic-woman-newgrange",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 19,
      externalId: "7iZmfIu4NdCIVJC36AfvVB",
      externalLink: "https://open.spotify.com/track/7iZmfIu4NdCIVJC36AfvVB",
    },
  ],
} as const satisfies Track
