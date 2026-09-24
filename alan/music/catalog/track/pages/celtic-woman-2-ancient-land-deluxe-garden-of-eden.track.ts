import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeGardenOfEden = {
  id: "01a0abea-5a02-775f-86ab-608ac91a5079",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-garden-of-eden",
  ownLength: 3.39755,
  ownProgress: 3.39755,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Garden Of Eden",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "gardenofeden|6NWtt9pNOL2Gx7kBykdE5x|203853",
  song: "song/celtic-woman-garden-of-eden",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 14,
      externalId: "5yiIItWLpYtH9eoXE3Tjxf",
      externalLink: "https://open.spotify.com/track/5yiIItWLpYtH9eoXE3Tjxf",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "0PJMT4f3kAFxWCJyn1BZKw",
      externalLink: "https://open.spotify.com/track/0PJMT4f3kAFxWCJyn1BZKw",
    },
  ],
} as const satisfies Track
