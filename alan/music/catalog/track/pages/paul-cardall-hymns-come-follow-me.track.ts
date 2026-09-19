import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsComeFollowMe = {
  id: "01a0b4c8-637c-7d46-9c14-8205893b09bd",
  type: "page-type/track",
  slug: "paul-cardall-hymns-come-follow-me",
  ownLength: 2.63355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6AflQvRt7KegL9QPSm2SzD",
      externalLink: "https://open.spotify.com/track/6AflQvRt7KegL9QPSm2SzD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Come, Follow Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "comefollowme|7FQRbf8gbKw8KZQZAJWxH2|158013",
  song: "song/paul-cardall-come-follow-me",
} as const satisfies Track
