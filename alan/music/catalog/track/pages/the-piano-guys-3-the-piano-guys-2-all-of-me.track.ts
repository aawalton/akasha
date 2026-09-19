import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2AllOfMe = {
  id: "01a0afa2-207f-7aa2-b1c1-2465db0deb9f",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-all-of-me",
  ownLength: 3.0458333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mmFIKwzAA4ReWyLWzRHIE",
      externalLink: "https://open.spotify.com/track/4mmFIKwzAA4ReWyLWzRHIE",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All of Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "allofme|0jW6R8CVyVohuUJVcuweDI|182750",
  song: "song/the-piano-guys-all-of-me",
} as const satisfies Track
