import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSharksSharks = {
  id: "01a0c43f-da39-7cd1-89da-e3ad2c2044d6",
  type: "page-type/track",
  slug: "imagine-dragons-sharks-sharks",
  ownLength: 3.1813833333333332,
  ownProgress: 3.1813833333333332,
  partOfCollections: ["release/imagine-dragons-sharks"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TyUOnU4H4GLqOcrH0auc8",
      externalLink: "https://open.spotify.com/track/0TyUOnU4H4GLqOcrH0auc8",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Sharks",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "sharks|53XhwfbYqKCa1cC15pYq2q|190883",
  song: "song/imagine-dragons-sharks",
} as const satisfies Track
