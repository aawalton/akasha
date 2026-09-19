import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodFathersEyes = {
  id: "01a0afa2-1b69-799d-a294-aa6f475cdf28",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-fathers-eyes",
  ownLength: 3.914066666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YSwdpFAYzm5C0OQlenezw",
      externalLink: "https://open.spotify.com/track/3YSwdpFAYzm5C0OQlenezw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Fathers' Eyes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "fatherseyes|0jW6R8CVyVohuUJVcuweDI|234844",
  song: "song/the-piano-guys-fathers-eyes",
} as const satisfies Track
