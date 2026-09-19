import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimePassingTime = {
  id: "01a0b4c8-6bc3-7e69-9e54-66df03f335f5",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-passing-time",
  ownLength: 3.978,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-passing-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PelR6ZEm4UK5cr4pZWiaz",
      externalLink: "https://open.spotify.com/track/2PelR6ZEm4UK5cr4pZWiaz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Passing Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|238680",
  song: "song/paul-cardall-passing-time",
} as const satisfies Track
