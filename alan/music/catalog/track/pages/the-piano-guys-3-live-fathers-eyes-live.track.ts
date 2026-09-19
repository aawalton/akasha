import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveFathersEyesLive = {
  id: "01a0afa2-1426-70b6-a0e3-adf84ef278ac",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-fathers-eyes-live",
  ownLength: 4.170216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2l82fJTaKU3fuDPku9dc7c",
      externalLink: "https://open.spotify.com/track/2l82fJTaKU3fuDPku9dc7c",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Fathers' Eyes (Live)",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "fatherseyeslive|0jW6R8CVyVohuUJVcuweDI|250213",
  song: "song/the-piano-guys-fathers-eyes",
} as const satisfies Track
