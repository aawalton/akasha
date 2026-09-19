import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveTheReleaseLive = {
  id: "01a0b4c8-57ef-7324-9526-a2dbce3cf2ec",
  type: "page-type/track",
  slug: "paul-cardall-live-the-release-live",
  ownLength: 3.14355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dPi85bJs6tWOHijHjjIfB",
      externalLink: "https://open.spotify.com/track/6dPi85bJs6tWOHijHjjIfB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Release - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thereleaselive|7FQRbf8gbKw8KZQZAJWxH2|188613",
  song: "song/paul-cardall-the-release",
} as const satisfies Track
