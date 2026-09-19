import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulTheNoise = {
  id: "01a0b4c8-599f-7d4e-95bd-cb84109adf6f",
  type: "page-type/track",
  slug: "paul-cardall-faithful-the-noise",
  ownLength: 5.370666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30eZMtwcCRfXfOoDuRqEts",
      externalLink: "https://open.spotify.com/track/30eZMtwcCRfXfOoDuRqEts",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Noise",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thenoise|7FQRbf8gbKw8KZQZAJWxH2|322240",
  song: "song/paul-cardall-the-noise",
} as const satisfies Track
