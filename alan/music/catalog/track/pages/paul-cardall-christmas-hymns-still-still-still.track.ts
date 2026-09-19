import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsStillStillStill = {
  id: "01a0b4c8-5459-7ee3-b89c-58d4610c4093",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-still-still-still",
  ownLength: 3.3828833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zTbnKqL1F7GaO9PjPPRfr",
      externalLink: "https://open.spotify.com/track/4zTbnKqL1F7GaO9PjPPRfr",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Still Still Still",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "stillstillstill|7FQRbf8gbKw8KZQZAJWxH2|202973",
  song: "song/paul-cardall-still-still-still",
} as const satisfies Track
