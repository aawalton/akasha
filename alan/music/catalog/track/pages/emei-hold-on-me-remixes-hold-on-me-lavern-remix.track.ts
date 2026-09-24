import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiHoldOnMeRemixesHoldOnMeLavernRemix = {
  id: "01a0c43e-7aaf-7ca4-95cd-a5c273dbec66",
  type: "page-type/track",
  slug: "emei-hold-on-me-remixes-hold-on-me-lavern-remix",
  ownLength: 2.3076833333333333,
  ownProgress: 2.3076833333333333,
  partOfCollections: ["release/emei-hold-on-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hold On Me - Lavern Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artistName: "NOTD" }, { artist: "artist/emei" }, { artistName: "Lavern" }],
  trackKey:
    "holdonmelavernremix|03y4yOxhLk6MDJ1bV424uO,5jAMCwdNHWr7JThxtMuEyy,7E2aQQjErJocovYFjYLzWU|138461",
  song: "song/emei-hold-on-me",
  carriedBy: [
    {
      release: "release/emei-hold-on-me-remixes",
      discNumber: 1,
      position: 1,
      externalId: "4zv2umOrC6X06s2P9bs7iO",
      externalLink: "https://open.spotify.com/track/4zv2umOrC6X06s2P9bs7iO",
    },
  ],
} as const satisfies Track
