import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeTheEnchantedWay = {
  id: "01a0abea-5a5a-7906-aee3-c575062aa04e",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-the-enchanted-way",
  ownLength: 2.856,
  ownProgress: 2.856,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Enchanted Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "theenchantedway|6NWtt9pNOL2Gx7kBykdE5x|171360",
  song: "song/celtic-woman-the-enchanted-way",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 17,
      externalId: "6uLJhPSzjH3MkUhFLZS9SR",
      externalLink: "https://open.spotify.com/track/6uLJhPSzjH3MkUhFLZS9SR",
    },
  ],
} as const satisfies Track
