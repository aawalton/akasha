import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiHoldOnMeRemixesHoldOnMeDemotapesRemix = {
  id: "01a0c43e-7ad7-7daf-9193-6842a68bc54c",
  type: "page-type/track",
  slug: "emei-hold-on-me-remixes-hold-on-me-demotapes-remix",
  ownLength: 2.4375,
  ownProgress: 2.4375,
  partOfCollections: ["release/emei-hold-on-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hold On Me - demotapes Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artistName: "NOTD" }, { artist: "artist/emei" }, { artistName: "demotapes" }],
  trackKey:
    "holdonmedemotapesremix|5jAMCwdNHWr7JThxtMuEyy,7E2aQQjErJocovYFjYLzWU,7J3jiKIiROsYOlJeEml34X|146250",
  song: "song/emei-hold-on-me",
  carriedBy: [
    {
      release: "release/emei-hold-on-me-remixes",
      discNumber: 1,
      position: 2,
      externalId: "0j0ufA8RydnwtqaSbqe1fS",
      externalLink: "https://open.spotify.com/track/0j0ufA8RydnwtqaSbqe1fS",
    },
  ],
} as const satisfies Track
