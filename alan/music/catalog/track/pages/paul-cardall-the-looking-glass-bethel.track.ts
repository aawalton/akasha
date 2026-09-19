import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassBethel = {
  id: "01a0b4c8-6048-78d3-bd14-57fa83a2f62b",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-bethel",
  ownLength: 3.013333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bEjG91Nn6KoxX8FGDUbHn",
      externalLink: "https://open.spotify.com/track/5bEjG91Nn6KoxX8FGDUbHn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bethel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bethel|7FQRbf8gbKw8KZQZAJWxH2|180800",
  song: "song/paul-cardall-bethel",
} as const satisfies Track
