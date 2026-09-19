import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveHuntersHeartLive = {
  id: "01a0b4c8-583d-7f88-9683-95e277dfa2b5",
  type: "page-type/track",
  slug: "paul-cardall-live-hunters-heart-live",
  ownLength: 3.5102166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oB7BUHgIs8njuXMQNW9O2",
      externalLink: "https://open.spotify.com/track/2oB7BUHgIs8njuXMQNW9O2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hunter's Heart - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "huntersheartlive|7FQRbf8gbKw8KZQZAJWxH2|210613",
  song: "song/paul-cardall-hunters-heart",
} as const satisfies Track
