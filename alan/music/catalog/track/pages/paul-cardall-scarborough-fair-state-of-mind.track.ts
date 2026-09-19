import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairStateOfMind = {
  id: "01a0b4c8-6b36-7755-8bb6-035e4b68b2be",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-state-of-mind",
  ownLength: 4.232266666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Gvm4u2PkIjUgjcVohPLGM",
      externalLink: "https://open.spotify.com/track/5Gvm4u2PkIjUgjcVohPLGM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "State of Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|253936",
  song: "song/paul-cardall-state-of-mind",
} as const satisfies Track
