import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoTitaniumPavane = {
  id: "01a0afa1-ceec-7633-8868-5fb3c1e04110",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-titanium-pavane",
  ownLength: 4.804683333333333,
  ownProgress: 4.804683333333333,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6OtJhd8UAocI8RY4fpBztO",
      externalLink: "https://open.spotify.com/track/6OtJhd8UAocI8RY4fpBztO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Titanium / Pavane",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|288281",
  song: "song/the-piano-guys-titanium-pavane",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 9,
      externalId: "6OtJhd8UAocI8RY4fpBztO",
      externalLink: "https://open.spotify.com/track/6OtJhd8UAocI8RY4fpBztO",
    },
  ],
} as const satisfies Track
