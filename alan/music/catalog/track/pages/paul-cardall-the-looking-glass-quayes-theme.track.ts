import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassQuayesTheme = {
  id: "01a0b4c8-6154-7f54-943e-836bcbd2a618",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-quayes-theme",
  ownLength: 3.7771,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29Hnf236RAcKaL9pUaryDB",
      externalLink: "https://open.spotify.com/track/29Hnf236RAcKaL9pUaryDB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Quaye's Theme",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "quayestheme|7FQRbf8gbKw8KZQZAJWxH2|226626",
} as const satisfies Track
