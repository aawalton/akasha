import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdInfraredCalculated = {
  id: "01a0d3ab-ba65-7f4e-838f-d83591d1209e",
  type: "page-type/track",
  slug: "em-beihold-infrared-calculated",
  ownLength: 3.9929333333333332,
  ownProgress: 3.9929333333333332,
  partOfCollections: ["release/em-beihold-infrared"],
  status: "completed",
  unit: "unit/minutes",
  title: "Calculated",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "calculated|7o2ZQYM7nTsaVdkXY38UAA|239576",
  song: "song/em-beihold-calculated",
  carriedBy: [
    {
      release: "release/em-beihold-infrared",
      discNumber: 1,
      position: 3,
      externalId: "1RLvckTKLCTKE7PTIzicqz",
      externalLink: "https://open.spotify.com/track/1RLvckTKLCTKE7PTIzicqz",
    },
  ],
} as const satisfies Track
