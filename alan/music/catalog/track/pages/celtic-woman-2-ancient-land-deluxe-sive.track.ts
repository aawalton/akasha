import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeSive = {
  id: "01a0abea-5936-7d2f-b6e4-8c54a492d194",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-sive",
  ownLength: 3.1728833333333335,
  ownProgress: 3.1728833333333335,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sive",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "sive|6NWtt9pNOL2Gx7kBykdE5x|190373",
  song: "song/celtic-woman-sive",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 8,
      externalId: "5voZZIKoVrjNTAyl9Grr7A",
      externalLink: "https://open.spotify.com/track/5voZZIKoVrjNTAyl9Grr7A",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "0ILVEgsDRpDuDafitrky6B",
      externalLink: "https://open.spotify.com/track/0ILVEgsDRpDuDafitrky6B",
    },
  ],
} as const satisfies Track
