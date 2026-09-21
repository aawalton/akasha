import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiHoldOnMeRemixesHoldOnMeDemotapesRemix = {
  id: "01a0c43e-7ad7-7daf-9193-6842a68bc54c",
  type: "page-type/track",
  slug: "emei-hold-on-me-remixes-hold-on-me-demotapes-remix",
  ownLength: 2.4375,
  ownProgress: 0,
  partOfCollections: ["release/emei-hold-on-me-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0j0ufA8RydnwtqaSbqe1fS",
      externalLink: "https://open.spotify.com/track/0j0ufA8RydnwtqaSbqe1fS",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Hold On Me - demotapes Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5jAMCwdNHWr7JThxtMuEyy", artistName: "NOTD" },
    { externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" },
    { externalId: "7J3jiKIiROsYOlJeEml34X", artistName: "demotapes" },
  ],
  trackKey:
    "holdonmedemotapesremix|5jAMCwdNHWr7JThxtMuEyy,7E2aQQjErJocovYFjYLzWU,7J3jiKIiROsYOlJeEml34X|146250",
  song: "song/emei-hold-on-me",
} as const satisfies Track
