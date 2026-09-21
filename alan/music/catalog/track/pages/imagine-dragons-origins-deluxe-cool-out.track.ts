import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeCoolOut = {
  id: "01a0c43f-c7d6-7513-a713-138572c9453a",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-cool-out",
  ownLength: 3.6311,
  ownProgress: 3.6311,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LXMUR2rpxFBDo6nilS3yX",
      externalLink: "https://open.spotify.com/track/6LXMUR2rpxFBDo6nilS3yX",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cool Out",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "coolout|53XhwfbYqKCa1cC15pYq2q|217866",
  song: "song/imagine-dragons-cool-out",
} as const satisfies Track
