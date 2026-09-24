import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresMyUniverse = {
  id: "01a0b9ee-ce5f-7ac8-81db-6c801567b3e9",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-my-universe",
  ownLength: 3.7699666666666665,
  ownProgress: 3.7699666666666665,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Universe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "BTS" }],
  trackKey: "myuniverse|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|226198",
  song: "song/coldplay-my-universe",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 10,
      externalId: "46HNZY1i7O6jwTA7Slo2PI",
      externalLink: "https://open.spotify.com/track/46HNZY1i7O6jwTA7Slo2PI",
    },
  ],
} as const satisfies Track
