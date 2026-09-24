import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageHugsKisses = {
  id: "01a0afa2-7371-7371-ac39-443576ac9dcf",
  type: "page-type/track",
  slug: "jisoo-amortage-hugs-kisses",
  ownLength: 3.1637666666666666,
  ownProgress: 3.1637666666666666,
  partOfCollections: ["release/jisoo-amortage"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hugs & Kisses",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "hugskisses|6UZ0ba50XreR4TM8u322gs|189826",
  song: "song/jisoo-hugs-kisses",
  carriedBy: [
    {
      release: "release/jisoo-amortage",
      discNumber: 1,
      position: 4,
      externalId: "5nQVbMv0XEGLGB39wpneQI",
      externalLink: "https://open.spotify.com/track/5nQVbMv0XEGLGB39wpneQI",
    },
  ],
} as const satisfies Track
