import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysTitaniumPavane = {
  id: "01a0afa2-18a1-781e-b0e1-563f8f5153d5",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-titanium-pavane",
  ownLength: 4.8406,
  ownProgress: 4.8406,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Titanium / Pavane",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|290436",
  song: "song/the-piano-guys-titanium-pavane",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 1,
      externalId: "4lAZaMGhx9Di03Vz9tfNzy",
      externalLink: "https://open.spotify.com/track/4lAZaMGhx9Di03Vz9tfNzy",
    },
  ],
} as const satisfies Track
