import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeExcuses = {
  id: "01a0c622-15a5-7421-80fc-6573f80cbbdd",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-excuses",
  ownLength: 2.3618166666666665,
  ownProgress: 2.3618166666666665,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "excuses",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "excuses|0VMFTqmv0hYlWruyBERT95|141709",
  song: "song/jessica-baio-excuses",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "41Tl8Wk6Y7VTwtIUvMPQpQ",
      externalLink: "https://open.spotify.com/track/41Tl8Wk6Y7VTwtIUvMPQpQ",
    },
  ],
} as const satisfies Track
