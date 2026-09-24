import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeOverTheRainbow = {
  id: "01a0abea-5b20-7b61-9955-54550865e0b3",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-over-the-rainbow",
  ownLength: 3.4053333333333335,
  ownProgress: 3.4053333333333335,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-over-the-rainbow",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Over The Rainbow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|204320",
  song: "song/celtic-woman-over-the-rainbow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 23,
      externalId: "52uWFLwaEzpWBhLT5BWIKv",
      externalLink: "https://open.spotify.com/track/52uWFLwaEzpWBhLT5BWIKv",
    },
    {
      release: "release/celtic-woman-2-over-the-rainbow",
      discNumber: 1,
      position: 1,
      externalId: "6CMD5M18Gw5MG3rcdi5EpO",
      externalLink: "https://open.spotify.com/track/6CMD5M18Gw5MG3rcdi5EpO",
    },
  ],
} as const satisfies Track
