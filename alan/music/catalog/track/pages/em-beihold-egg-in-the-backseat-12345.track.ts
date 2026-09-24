import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseat12345 = {
  id: "01a0d3ab-b4bf-70a9-88a6-483177afd84d",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-12345",
  ownLength: 2.74215,
  ownProgress: 2.74215,
  partOfCollections: ["release/em-beihold-egg-in-the-backseat"],
  status: "completed",
  unit: "unit/minutes",
  title: "12345",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/em-beihold" }],
  trackKey: "12345|7o2ZQYM7nTsaVdkXY38UAA|164529",
  song: "song/em-beihold-12345",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 6,
      externalId: "0fxUGOzBYJGKgs5ZKw1Em5",
      externalLink: "https://open.spotify.com/track/0fxUGOzBYJGKgs5ZKw1Em5",
    },
  ],
} as const satisfies Track
