import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesWeNeverChange = {
  id: "01a0b9ee-ea63-7082-b7d8-69535e30a4cb",
  type: "page-type/track",
  slug: "coldplay-parachutes-we-never-change",
  ownLength: 4.156666666666666,
  ownProgress: 4.156666666666666,
  partOfCollections: ["release/coldplay-parachutes"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Never Change",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "weneverchange|4gzpq5DPGxSnKTe4SA8HAU|249400",
  song: "song/coldplay-we-never-change",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 9,
      externalId: "5TB6QgrF0RPIxSCGfRDLoe",
      externalLink: "https://open.spotify.com/track/5TB6QgrF0RPIxSCGfRDLoe",
    },
  ],
  createdAt: "2026-09-19T13:50:37.667Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
