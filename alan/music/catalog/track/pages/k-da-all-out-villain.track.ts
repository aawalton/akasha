import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaAllOutVillain = {
  id: "01a0c957-fea9-7a2e-8559-dc37d0bfd51f",
  type: "page-type/track",
  slug: "k-da-all-out-villain",
  ownLength: 3.31875,
  ownProgress: 0,
  partOfCollections: ["release/k-da-all-out"],
  status: "not-started",
  unit: "unit/minutes",
  title: "VILLAIN",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "4gOc8TsQed9eqnqJct2c5v", artistName: "K/DA" },
    { externalId: "2kRfqPViCqYdSGhYSM9R0Q", artistName: "Madison Beer" },
    { externalId: "3Xt3RrJMFv5SZkCfUE8C1J", artistName: "Kim Petras" },
    { externalId: "47mIJdHORyRerp4os813jD", artistName: "League of Legends" },
  ],
  trackKey:
    "villain|2kRfqPViCqYdSGhYSM9R0Q,3Xt3RrJMFv5SZkCfUE8C1J,47mIJdHORyRerp4os813jD,4gOc8TsQed9eqnqJct2c5v|199125",
  song: "song/k-da-villain",
  carriedBy: [
    {
      release: "release/k-da-all-out",
      discNumber: 1,
      position: 3,
      externalId: "33CZravFcGBOwRw5dCOCel",
      externalLink: "https://open.spotify.com/track/33CZravFcGBOwRw5dCOCel",
    },
  ],
} as const satisfies Track
