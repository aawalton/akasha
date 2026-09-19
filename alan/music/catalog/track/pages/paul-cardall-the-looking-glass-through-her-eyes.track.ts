import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassThroughHerEyes = {
  id: "01a0b4c8-60cf-72a9-8b09-7c12d2f57144",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-through-her-eyes",
  ownLength: 3.3388833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0caZUZPv4whG4XjnLbcI0Z",
      externalLink: "https://open.spotify.com/track/0caZUZPv4whG4XjnLbcI0Z",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Through Her Eyes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "throughhereyes|7FQRbf8gbKw8KZQZAJWxH2|200333",
  song: "song/paul-cardall-through-her-eyes",
} as const satisfies Track
