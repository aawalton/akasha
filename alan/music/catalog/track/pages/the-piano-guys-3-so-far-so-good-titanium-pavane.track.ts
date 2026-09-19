import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodTitaniumPavane = {
  id: "01a0afa2-1bf4-7c8f-a0af-ba4f2b4d12c6",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-titanium-pavane",
  ownLength: 4.841583333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2traHrKT3QSX2gczW5nWOs",
      externalLink: "https://open.spotify.com/track/2traHrKT3QSX2gczW5nWOs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Titanium / Pavane",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|290495",
  song: "song/the-piano-guys-titanium-pavane",
} as const satisfies Track
