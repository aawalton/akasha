import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefAGriefObserved = {
  id: "01a0b4c8-261c-79e8-aec1-455cba414ece",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-a-grief-observed",
  ownLength: 3.9488166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ndHSCDVY7VZi1KADiV3sU",
      externalLink: "https://open.spotify.com/track/2ndHSCDVY7VZi1KADiV3sU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Grief Observed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "agriefobserved|7FQRbf8gbKw8KZQZAJWxH2|236929",
  song: "song/paul-cardall-a-grief-observed",
} as const satisfies Track
