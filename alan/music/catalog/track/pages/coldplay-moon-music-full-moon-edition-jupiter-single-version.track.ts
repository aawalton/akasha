import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionJupiterSingleVersion = {
  id: "01a0b9ee-cc4d-7896-a869-8fd3b471e887",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-jupiter-single-version",
  ownLength: 2.8875,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fsBnPUzyKk8FxedqAlyx7",
      externalLink: "https://open.spotify.com/track/4fsBnPUzyKk8FxedqAlyx7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jupiter - Single Version",
  trackType: "version",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "jupitersingleversion|4gzpq5DPGxSnKTe4SA8HAU|173250",
  song: "song/coldplay-jupiter",
} as const satisfies Track
