import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageHugsKisses = {
  id: "01a0afa2-7371-7371-ac39-443576ac9dcf",
  type: "page-type/track",
  slug: "jisoo-amortage-hugs-kisses",
  ownLength: 3.1637666666666666,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-amortage"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nQVbMv0XEGLGB39wpneQI",
      externalLink: "https://open.spotify.com/track/5nQVbMv0XEGLGB39wpneQI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hugs & Kisses",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "hugskisses|6UZ0ba50XreR4TM8u322gs|189826",
  song: "song/jisoo-hugs-kisses",
} as const satisfies Track
