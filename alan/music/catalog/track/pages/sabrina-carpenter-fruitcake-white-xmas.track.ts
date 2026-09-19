import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeWhiteXmas = {
  id: "01a0b111-2d35-713c-9afe-007e7351cc3e",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-white-xmas",
  ownLength: 2.4364666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7g5DlwyMdGDvcExDg5H2BA",
      externalLink: "https://open.spotify.com/track/7g5DlwyMdGDvcExDg5H2BA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "white xmas",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "whitexmas|74KM79TiuVKeVCqs8QtB0B|146188",
  song: "song/sabrina-carpenter-white-xmas",
} as const satisfies Track
