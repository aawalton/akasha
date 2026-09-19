import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeEchoOfMyShadow = {
  id: "01a0b637-eb69-7669-874f-4aa97e50558e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-echo-of-my-shadow",
  ownLength: 4.080216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XFi6TdNIZgHTyM2eCxXJv",
      externalLink: "https://open.spotify.com/track/5XFi6TdNIZgHTyM2eCxXJv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Echo Of My Shadow",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "echoofmyshadow|1WgXqy2Dd70QQOU7Ay074N|244813",
  song: "song/aurora-echo-of-my-shadow",
} as const satisfies Track
