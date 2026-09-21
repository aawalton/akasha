import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBadLiar = {
  id: "01a0c43f-c7fb-737b-8673-0b8539c59e03",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-bad-liar",
  ownLength: 4.346216666666667,
  ownProgress: 4.346216666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2RSHsoi04658QL5xgQVov3",
      externalLink: "https://open.spotify.com/track/2RSHsoi04658QL5xgQVov3",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Bad Liar",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "badliar|53XhwfbYqKCa1cC15pYq2q|260773",
  song: "song/imagine-dragons-bad-liar",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "2RSHsoi04658QL5xgQVov3",
      externalLink: "https://open.spotify.com/track/2RSHsoi04658QL5xgQVov3",
    },
  ],
} as const satisfies Track
