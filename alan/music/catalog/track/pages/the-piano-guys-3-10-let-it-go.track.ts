import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310LetItGo = {
  id: "01a0afa2-0c50-706c-bf5f-e0982240d935",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-let-it-go",
  ownLength: 4.0107,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7AOfVAuxZ89ProPfA4Ozo3",
      externalLink: "https://open.spotify.com/track/7AOfVAuxZ89ProPfA4Ozo3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Go",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|240642",
  song: "song/the-piano-guys-let-it-go",
} as const satisfies Track
