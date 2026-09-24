import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeWhiteXmas = {
  id: "01a0b111-2d35-713c-9afe-007e7351cc3e",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-white-xmas",
  ownLength: 2.4364666666666666,
  ownProgress: 2.4364666666666666,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  status: "completed",
  unit: "unit/minutes",
  title: "white xmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "whitexmas|74KM79TiuVKeVCqs8QtB0B|146188",
  song: "song/sabrina-carpenter-white-xmas",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-fruitcake",
      discNumber: 1,
      position: 6,
      externalId: "7g5DlwyMdGDvcExDg5H2BA",
      externalLink: "https://open.spotify.com/track/7g5DlwyMdGDvcExDg5H2BA",
    },
  ],
} as const satisfies Track
