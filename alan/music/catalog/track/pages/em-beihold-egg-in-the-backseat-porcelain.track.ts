import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseatPorcelain = {
  id: "01a0d3ab-b442-754b-a1db-cf1288224660",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-porcelain",
  ownLength: 2.485,
  ownProgress: 2.485,
  partOfCollections: ["release/em-beihold-egg-in-the-backseat"],
  status: "completed",
  unit: "unit/minutes",
  title: "Porcelain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "porcelain|7o2ZQYM7nTsaVdkXY38UAA|149100",
  song: "song/em-beihold-porcelain",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 3,
      externalId: "7G2W0SU0bdxC48g1gzB4Rz",
      externalLink: "https://open.spotify.com/track/7G2W0SU0bdxC48g1gzB4Rz",
    },
  ],
} as const satisfies Track
