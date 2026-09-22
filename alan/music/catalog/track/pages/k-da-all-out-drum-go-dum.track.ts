import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaAllOutDrumGoDum = {
  id: "01a0c957-fef4-7d92-850d-858e3cfc7a6e",
  type: "page-type/track",
  slug: "k-da-all-out-drum-go-dum",
  ownLength: 3.3485666666666667,
  ownProgress: 3.3485666666666667,
  partOfCollections: ["release/k-da-all-out"],
  status: "completed",
  unit: "unit/minutes",
  title: "DRUM GO DUM",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "4gOc8TsQed9eqnqJct2c5v", artistName: "K/DA" },
    { externalId: "7qd6KGoABHifvXKeFNe2Yb", artistName: "Wolftyla" },
    { externalId: "260LldmHBR0r2wtWtjzNxL", artistName: "Bekuh Boom" },
    { externalId: "5ITI6SEoUZMIXXkzCfr4oE", artistName: "Aluna" },
    { externalId: "47mIJdHORyRerp4os813jD", artistName: "League of Legends" },
  ],
  trackKey:
    "drumgodum|260LldmHBR0r2wtWtjzNxL,47mIJdHORyRerp4os813jD,4gOc8TsQed9eqnqJct2c5v,5ITI6SEoUZMIXXkzCfr4oE,7qd6KGoABHifvXKeFNe2Yb|200914",
  song: "song/k-da-drum-go-dum",
  carriedBy: [
    {
      release: "release/k-da-all-out",
      discNumber: 1,
      position: 4,
      externalId: "3CEW3iffD2QvNZMK20sMqW",
      externalLink: "https://open.spotify.com/track/3CEW3iffD2QvNZMK20sMqW",
    },
  ],
} as const satisfies Track
