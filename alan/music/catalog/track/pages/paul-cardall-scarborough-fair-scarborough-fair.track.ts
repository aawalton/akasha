import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairScarboroughFair = {
  id: "01a0b4c8-6b13-7c1e-b199-c61c828b1240",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-scarborough-fair",
  ownLength: 3.7159166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28TQFzfZsfJ3nZQRCptvXe",
      externalLink: "https://open.spotify.com/track/28TQFzfZsfJ3nZQRCptvXe",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Scarborough Fair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "scarboroughfair|7FQRbf8gbKw8KZQZAJWxH2|222955",
  song: "song/paul-cardall-scarborough-fair",
} as const satisfies Track
