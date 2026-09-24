import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodTitaniumPavane = {
  id: "01a0afa2-1bf4-7c8f-a0af-ba4f2b4d12c6",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-titanium-pavane",
  ownLength: 4.841583333333333,
  ownProgress: 4.841583333333333,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Titanium / Pavane",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|290495",
  song: "song/the-piano-guys-titanium-pavane",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 9,
      externalId: "2traHrKT3QSX2gczW5nWOs",
      externalLink: "https://open.spotify.com/track/2traHrKT3QSX2gczW5nWOs",
    },
  ],
} as const satisfies Track
