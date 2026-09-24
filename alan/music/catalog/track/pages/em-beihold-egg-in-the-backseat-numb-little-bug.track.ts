import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseatNumbLittleBug = {
  id: "01a0d3ab-b855-75bd-a126-38e856bbb9e9",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-numb-little-bug",
  ownLength: 2.8206166666666665,
  ownProgress: 0,
  partOfCollections: [
    "release/em-beihold-egg-in-the-backseat",
    "release/em-beihold-numb-little-bug",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Numb Little Bug",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "numblittlebug|7o2ZQYM7nTsaVdkXY38UAA|169237",
  song: "song/em-beihold-numb-little-bug",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 2,
      externalId: "1KQc37jezhunxnOPhvdwSG",
      externalLink: "https://open.spotify.com/track/1KQc37jezhunxnOPhvdwSG",
    },
    {
      release: "release/em-beihold-numb-little-bug",
      discNumber: 1,
      position: 1,
      externalId: "3o9kpgkIcffx0iSwxhuNI2",
      externalLink: "https://open.spotify.com/track/3o9kpgkIcffx0iSwxhuNI2",
    },
  ],
} as const satisfies Track
