import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsScarboroughFair = {
  id: "01a0b4c8-3df4-7b45-8d7b-a1a25dba0338",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-scarborough-fair",
  ownLength: 3.713766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47SHSVRz8fEVfssJ3Z6wlS",
      externalLink: "https://open.spotify.com/track/47SHSVRz8fEVfssJ3Z6wlS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Scarborough Fair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "scarboroughfair|7FQRbf8gbKw8KZQZAJWxH2|222826",
  song: "song/paul-cardall-scarborough-fair",
} as const satisfies Track
