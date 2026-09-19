import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulSweetEscape = {
  id: "01a0b4c8-597e-730e-9ba7-405f28ce9ea2",
  type: "page-type/track",
  slug: "paul-cardall-faithful-sweet-escape",
  ownLength: 3.121766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4w9h6vXTaREnUcmEL9yaZA",
      externalLink: "https://open.spotify.com/track/4w9h6vXTaREnUcmEL9yaZA",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Escape",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetescape|7FQRbf8gbKw8KZQZAJWxH2|187306",
  song: "song/paul-cardall-sweet-escape",
} as const satisfies Track
