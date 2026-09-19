import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartEchoOfMyShadow = {
  id: "01a0b637-ee87-7f21-b2c5-7dce90812e55",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-echo-of-my-shadow",
  ownLength: 4.080216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "71C3wpAeAjNfK8hwacQW5U",
      externalLink: "https://open.spotify.com/track/71C3wpAeAjNfK8hwacQW5U",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Echo Of My Shadow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "echoofmyshadow|1WgXqy2Dd70QQOU7Ay074N|244813",
  song: "song/aurora-echo-of-my-shadow",
} as const satisfies Track
