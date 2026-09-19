import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneSanitizedSongsMedley = {
  id: "01a0b4c6-cb99-75ea-9734-6aaab5812654",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-sanitized-songs-medley",
  ownLength: 3.1325166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Cpu3ra26hOBJduiAoxNza",
      externalLink: "https://open.spotify.com/track/0Cpu3ra26hOBJduiAoxNza",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sanitized Songs (Medley)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "sanitizedsongsmedley|6tITG4T8LpC0msapZ4wXGA|187951",
  song: "song/the-holderness-family-sanitized-songs-medley",
} as const satisfies Track
