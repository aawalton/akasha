import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSaveALittleLoveSaveALittleLove = {
  id: "01a0c622-1142-78d8-821c-2b5ba94385ce",
  type: "page-type/track",
  slug: "jessica-baio-save-a-little-love-save-a-little-love",
  ownLength: 2.8337,
  ownProgress: 2.8337,
  partOfCollections: ["release/jessica-baio-save-a-little-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "Save A Little Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "44Ewva5aHOX00EwaX2D2mh", artistName: "Two Friends" },
    { externalId: "1dID9zgn0OV0Y8ud7Mh2tS", artistName: "Dustin Lynch" },
    { externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" },
  ],
  trackKey:
    "savealittlelove|0VMFTqmv0hYlWruyBERT95,1dID9zgn0OV0Y8ud7Mh2tS,44Ewva5aHOX00EwaX2D2mh|170022",
  song: "song/jessica-baio-save-a-little-love",
  carriedBy: [
    {
      release: "release/jessica-baio-save-a-little-love",
      discNumber: 1,
      position: 1,
      externalId: "6z3Sc8aIpoJNHf7egh7jg4",
      externalLink: "https://open.spotify.com/track/6z3Sc8aIpoJNHf7egh7jg4",
    },
  ],
} as const satisfies Track
