import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpAllEyes = {
  id: "01a0c43f-e5c4-764d-97e2-7c59e4029fa0",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-all-eyes",
  ownLength: 2.986666666666667,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4haoEl9aPJiA0QzkpBmUAT",
      externalLink: "https://open.spotify.com/track/4haoEl9aPJiA0QzkpBmUAT",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "All Eyes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "alleyes|53XhwfbYqKCa1cC15pYq2q|179200",
  song: "song/imagine-dragons-all-eyes",
} as const satisfies Track
