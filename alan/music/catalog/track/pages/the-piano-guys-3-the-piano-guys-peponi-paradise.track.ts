import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysPeponiParadise = {
  id: "01a0afa2-18c3-7e0f-a815-68a1e7c6db9f",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-peponi-paradise",
  ownLength: 4.179366666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20ig2hDnHXETisuRBR4wVB",
      externalLink: "https://open.spotify.com/track/20ig2hDnHXETisuRBR4wVB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Peponi (Paradise)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "6SraGCznFUAZ3zb4zVe3DM", artistName: "Alex Boyé" },
  ],
  trackKey: "peponiparadise|0jW6R8CVyVohuUJVcuweDI,6SraGCznFUAZ3zb4zVe3DM|250762",
} as const satisfies Track
