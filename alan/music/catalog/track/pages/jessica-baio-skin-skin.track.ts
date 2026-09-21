import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSkinSkin = {
  id: "01a0c622-2406-75be-b4af-ba66835b8d32",
  type: "page-type/track",
  slug: "jessica-baio-skin-skin",
  ownLength: 3.209783333333333,
  ownProgress: 3.209783333333333,
  partOfCollections: ["release/jessica-baio-skin"],
  status: "completed",
  unit: "unit/minutes",
  title: "skin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "skin|0VMFTqmv0hYlWruyBERT95|192587",
  song: "song/jessica-baio-skin",
  carriedBy: [
    {
      release: "release/jessica-baio-skin",
      discNumber: 1,
      position: 1,
      externalId: "0Erz70vVvY6QTzZunPSn6u",
      externalLink: "https://open.spotify.com/track/0Erz70vVvY6QTzZunPSn6u",
    },
  ],
} as const satisfies Track
