import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeFaithsSong = {
  id: "01a0abea-59e0-7da4-9211-9bf68f412d18",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-faiths-song",
  ownLength: 4.05555,
  ownProgress: 4.05555,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Faith’s Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "faithssong|6NWtt9pNOL2Gx7kBykdE5x|243333",
  song: "song/celtic-woman-faiths-song",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 13,
      externalId: "0bGTNgq8V3xrbAXN4YDdOf",
      externalLink: "https://open.spotify.com/track/0bGTNgq8V3xrbAXN4YDdOf",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "3Ds7wfGUQwrQQ959Seu40N",
      externalLink: "https://open.spotify.com/track/3Ds7wfGUQwrQQ959Seu40N",
    },
  ],
} as const satisfies Track
