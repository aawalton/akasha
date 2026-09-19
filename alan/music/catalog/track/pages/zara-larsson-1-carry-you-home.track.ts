import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1CarryYouHome = {
  id: "01a0aa7c-34ab-7ee3-a87b-98d28c91661e",
  type: "page-type/track",
  slug: "zara-larsson-1-carry-you-home",
  ownLength: 4.242133333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1N8f3LpdR5TePmSYVSLU85",
      externalLink: "https://open.spotify.com/track/1N8f3LpdR5TePmSYVSLU85",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Carry You Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "carryyouhome|1Xylc3o4UrD53lo9CvFvVg|254528",
  song: "song/zara-larsson-carry-you-home",
} as const satisfies Track
