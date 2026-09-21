import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeDream = {
  id: "01a0c43f-d038-7a41-8c61-a97e202430aa",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-dream",
  ownLength: 4.3,
  ownProgress: 4.3,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5pryXvaRTif60GCf1e4rmc",
      externalLink: "https://open.spotify.com/track/5pryXvaRTif60GCf1e4rmc",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dream",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "dream|53XhwfbYqKCa1cC15pYq2q|258000",
  song: "song/imagine-dragons-dream",
} as const satisfies Track
