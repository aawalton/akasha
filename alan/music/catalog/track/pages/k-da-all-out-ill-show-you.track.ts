import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaAllOutIllShowYou = {
  id: "01a0c957-ff31-7592-8258-91747103e561",
  type: "page-type/track",
  slug: "k-da-all-out-ill-show-you",
  ownLength: 3.3101833333333333,
  ownProgress: 3.3101833333333333,
  partOfCollections: ["release/k-da-all-out"],
  status: "completed",
  unit: "unit/minutes",
  title: "I'LL SHOW YOU",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "4gOc8TsQed9eqnqJct2c5v", artistName: "K/DA" },
    { externalId: "7n2Ycct7Beij7Dj7meI4X0", artistName: "TWICE" },
    { externalId: "260LldmHBR0r2wtWtjzNxL", artistName: "Bekuh Boom" },
    { externalId: "0kErUwb6xgWfkdn0RyZWHZ", artistName: "Annika Wells" },
    { externalId: "47mIJdHORyRerp4os813jD", artistName: "League of Legends" },
  ],
  trackKey:
    "illshowyou|0kErUwb6xgWfkdn0RyZWHZ,260LldmHBR0r2wtWtjzNxL,47mIJdHORyRerp4os813jD,4gOc8TsQed9eqnqJct2c5v,7n2Ycct7Beij7Dj7meI4X0|198611",
  song: "song/k-da-ill-show-you",
  carriedBy: [
    {
      release: "release/k-da-all-out",
      discNumber: 1,
      position: 5,
      externalId: "497qmwcUsCv5hmMU0K8Hik",
      externalLink: "https://open.spotify.com/track/497qmwcUsCv5hmMU0K8Hik",
    },
  ],
} as const satisfies Track
