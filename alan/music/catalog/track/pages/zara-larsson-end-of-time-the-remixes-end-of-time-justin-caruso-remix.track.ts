import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEndOfTimeTheRemixesEndOfTimeJustinCarusoRemix = {
  id: "01a0aa7c-39a5-7096-8902-6f57b588d0c4",
  type: "page-type/track",
  slug: "zara-larsson-end-of-time-the-remixes-end-of-time-justin-caruso-remix",
  ownLength: 2.5453333333333332,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-end-of-time-the-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3fKcQ6KLB8DHxTe1UHHroa",
      externalLink: "https://open.spotify.com/track/3fKcQ6KLB8DHxTe1UHHroa",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "End Of Time - Justin Caruso Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1NyxTiCivDmzgFWYD1V01m", artistName: "Justin Caruso" },
  ],
  trackKey: "endoftimejustincarusoremix|1NyxTiCivDmzgFWYD1V01m,1Xylc3o4UrD53lo9CvFvVg|152720",
  song: "song/zara-larsson-end-of-time",
} as const satisfies Track
