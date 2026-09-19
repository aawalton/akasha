import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysTitaniumPavane = {
  id: "01a0afa2-18a1-781e-b0e1-563f8f5153d5",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-titanium-pavane",
  ownLength: 4.8406,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4lAZaMGhx9Di03Vz9tfNzy",
      externalLink: "https://open.spotify.com/track/4lAZaMGhx9Di03Vz9tfNzy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Titanium / Pavane",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|290436",
  song: "song/the-piano-guys-titanium-pavane",
} as const satisfies Track
