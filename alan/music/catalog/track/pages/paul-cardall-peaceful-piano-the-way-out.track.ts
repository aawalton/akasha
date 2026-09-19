import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoTheWayOut = {
  id: "01a0b4c8-32c5-7a64-8e74-4c06acf9d898",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-the-way-out",
  ownLength: 4.272216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ij3xYNImjBta3QzYtdfBa",
      externalLink: "https://open.spotify.com/track/4ij3xYNImjBta3QzYtdfBa",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Way Out",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thewayout|7FQRbf8gbKw8KZQZAJWxH2|256333",
  song: "song/paul-cardall-the-way-out",
} as const satisfies Track
