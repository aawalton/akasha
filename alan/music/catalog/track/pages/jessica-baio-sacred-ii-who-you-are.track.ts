import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiWhoYouAre = {
  id: "01a0c622-0f2e-7eb5-bc4e-9f320442a87e",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-who-you-are",
  ownLength: 2.7886166666666665,
  ownProgress: 2.7886166666666665,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "who you are",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "whoyouare|0VMFTqmv0hYlWruyBERT95|167317",
  song: "song/jessica-baio-who-you-are",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 5,
      externalId: "01C25hGWfXZbIX6DY879FX",
      externalLink: "https://open.spotify.com/track/01C25hGWfXZbIX6DY879FX",
    },
  ],
} as const satisfies Track
