import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysPeponiParadise = {
  id: "01a0afa2-18c3-7e0f-a815-68a1e7c6db9f",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-peponi-paradise",
  ownLength: 4.179366666666667,
  ownProgress: 4.179366666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Peponi (Paradise)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Alex Boyé" }],
  trackKey: "peponiparadise|0jW6R8CVyVohuUJVcuweDI,6SraGCznFUAZ3zb4zVe3DM|250762",
  song: "song/the-piano-guys-peponi-paradise",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 2,
      externalId: "20ig2hDnHXETisuRBR4wVB",
      externalLink: "https://open.spotify.com/track/20ig2hDnHXETisuRBR4wVB",
    },
  ],
} as const satisfies Track
