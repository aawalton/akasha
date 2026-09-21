import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesDontPanic = {
  id: "01a0b9ee-e926-7730-8b37-67fdd26872bc",
  type: "page-type/track",
  slug: "coldplay-parachutes-dont-panic",
  ownLength: 2.2811,
  ownProgress: 2.2811,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2QhURnm7mQDxBb5jWkbDug",
      externalLink: "https://open.spotify.com/track/2QhURnm7mQDxBb5jWkbDug",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Panic",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "dontpanic|4gzpq5DPGxSnKTe4SA8HAU|136866",
  song: "song/coldplay-dont-panic",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 1,
      externalId: "2QhURnm7mQDxBb5jWkbDug",
      externalLink: "https://open.spotify.com/track/2QhURnm7mQDxBb5jWkbDug",
    },
  ],
} as const satisfies Track
