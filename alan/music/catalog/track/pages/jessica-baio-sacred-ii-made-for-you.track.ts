import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiMadeForYou = {
  id: "01a0c622-1379-7a02-9ccf-26773037f3de",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-made-for-you",
  ownLength: 3.03225,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-sacred-ii", "release/jessica-baio-sacred"],
  status: "not-started",
  unit: "unit/minutes",
  title: "made for you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "madeforyou|0VMFTqmv0hYlWruyBERT95|181935",
  song: "song/jessica-baio-made-for-you",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 8,
      externalId: "4hBUi6CQ4TKhXpqQXlffvL",
      externalLink: "https://open.spotify.com/track/4hBUi6CQ4TKhXpqQXlffvL",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 8,
      externalId: "1idDmrsVNUtKifi7HEKOBR",
      externalLink: "https://open.spotify.com/track/1idDmrsVNUtKifi7HEKOBR",
    },
  ],
} as const satisfies Track
