import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingUnchainedMelody = {
  id: "01a0afa1-c8a2-7e59-8706-5c2d052efebd",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5a6MecWEWzjKkR3dh0Q4Fo",
      externalLink: "https://open.spotify.com/track/5a6MecWEWzjKkR3dh0Q4Fo",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
  song: "song/the-piano-guys-unchained-melody",
} as const satisfies Track
