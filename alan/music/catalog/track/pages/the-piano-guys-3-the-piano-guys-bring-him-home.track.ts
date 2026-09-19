import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysBringHimHome = {
  id: "01a0afa2-1a6c-7712-b422-2d21f81d17f5",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-bring-him-home",
  ownLength: 4.287133333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FvgjfERD2q146UmzjNTc4",
      externalLink: "https://open.spotify.com/track/3FvgjfERD2q146UmzjNTc4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Him Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "bringhimhome|0jW6R8CVyVohuUJVcuweDI|257228",
  song: "song/the-piano-guys-bring-him-home",
} as const satisfies Track
