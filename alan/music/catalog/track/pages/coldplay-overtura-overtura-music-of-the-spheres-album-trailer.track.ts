import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayOverturaOverturaMusicOfTheSpheresAlbumTrailer = {
  id: "01a0b9ee-ef81-7f1f-bc08-bc10681d9452",
  type: "page-type/track",
  slug: "coldplay-overtura-overtura-music-of-the-spheres-album-trailer",
  ownLength: 1.8802,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-overtura"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4b4vxX76SDUbp7chM24TU9",
      externalLink: "https://open.spotify.com/track/4b4vxX76SDUbp7chM24TU9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Overtura - Music Of The Spheres album trailer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "overturamusicofthespheresalbumtrailer|4gzpq5DPGxSnKTe4SA8HAU|112812",
  song: "song/coldplay-overtura-music-of-the-spheres-album-trailer",
} as const satisfies Track
