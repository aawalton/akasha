import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeDannyBoy = {
  id: "01a0abea-5b83-7126-95cd-6c7518e1aede",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-danny-boy",
  ownLength: 3.5366666666666666,
  ownProgress: 3.5366666666666666,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danny Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dannyboy|6NWtt9pNOL2Gx7kBykdE5x|212200",
  song: "song/celtic-woman-danny-boy",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 26,
      externalId: "565yQRDDmkCcsyfhEnsjS9",
      externalLink: "https://open.spotify.com/track/565yQRDDmkCcsyfhEnsjS9",
    },
  ],
} as const satisfies Track
