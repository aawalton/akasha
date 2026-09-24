import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpMiraclesSomeoneSpecial = {
  id: "01a0b9ee-f1c1-75eb-a21d-154b5e1fa2c5",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-miracles-someone-special",
  ownLength: 4.6151,
  ownProgress: 4.6151,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Miracles (Someone Special)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Big Sean" }],
  trackKey: "miraclessomeonespecial|0c173mlxpT3dSFRgMO8XPh,4gzpq5DPGxSnKTe4SA8HAU|276906",
  song: "song/coldplay-miracles-someone-special",
  carriedBy: [
    {
      release: "release/coldplay-kaleidoscope-ep",
      discNumber: 1,
      position: 2,
      externalId: "6uJwPeBGb3swi85TSr9iIz",
      externalLink: "https://open.spotify.com/track/6uJwPeBGb3swi85TSr9iIz",
    },
  ],
} as const satisfies Track
