import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionJupiterSingleVersion = {
  id: "01a0b9ee-cc4d-7896-a869-8fd3b471e887",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-jupiter-single-version",
  ownLength: 2.8875,
  ownProgress: 2.8875,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jupiter - Single Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "jupitersingleversion|4gzpq5DPGxSnKTe4SA8HAU|173250",
  song: "song/coldplay-jupiter",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 6,
      externalId: "4fsBnPUzyKk8FxedqAlyx7",
      externalLink: "https://open.spotify.com/track/4fsBnPUzyKk8FxedqAlyx7",
    },
  ],
} as const satisfies Track
