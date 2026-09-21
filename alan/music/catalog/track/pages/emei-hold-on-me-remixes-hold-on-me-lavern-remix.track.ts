import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiHoldOnMeRemixesHoldOnMeLavernRemix = {
  id: "01a0c43e-7aaf-7ca4-95cd-a5c273dbec66",
  type: "page-type/track",
  slug: "emei-hold-on-me-remixes-hold-on-me-lavern-remix",
  ownLength: 2.3076833333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-hold-on-me-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zv2umOrC6X06s2P9bs7iO",
      externalLink: "https://open.spotify.com/track/4zv2umOrC6X06s2P9bs7iO",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Hold On Me - Lavern Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5jAMCwdNHWr7JThxtMuEyy", artistName: "NOTD" },
    { externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" },
    { externalId: "03y4yOxhLk6MDJ1bV424uO", artistName: "Lavern" },
  ],
  trackKey:
    "holdonmelavernremix|03y4yOxhLk6MDJ1bV424uO,5jAMCwdNHWr7JThxtMuEyy,7E2aQQjErJocovYFjYLzWU|138461",
  song: "song/emei-hold-on-me",
} as const satisfies Track
