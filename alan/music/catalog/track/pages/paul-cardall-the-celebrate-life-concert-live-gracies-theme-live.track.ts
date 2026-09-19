import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveGraciesThemeLive = {
  id: "01a0b4c8-443f-7b67-8585-be9435cabc91",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-gracies-theme-live",
  ownLength: 5.018233333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "279qN4iAxK9FFOVFteOa5V",
      externalLink: "https://open.spotify.com/track/279qN4iAxK9FFOVFteOa5V",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gracie's Theme - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "graciesthemelive|7FQRbf8gbKw8KZQZAJWxH2|301094",
  song: "song/paul-cardall-gracies-theme",
} as const satisfies Track
