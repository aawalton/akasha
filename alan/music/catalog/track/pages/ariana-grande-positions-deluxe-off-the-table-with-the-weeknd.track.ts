import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeOffTheTableWithTheWeeknd = {
  id: "01a0a6c5-1f52-7cd4-b06e-b3dce87a63f1",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-off-the-table-with-the-weeknd",
  ownLength: 3.99915,
  ownProgress: 3.99915,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "off the table (with The Weeknd)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "The Weeknd" }],
  trackKey: "offthetablewiththeweeknd|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|239949",
  song: "song/ariana-grande-off-the-table",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 5,
      externalId: "7E1jVNoWuemqUryI4FxsVD",
      externalLink: "https://open.spotify.com/track/7E1jVNoWuemqUryI4FxsVD",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "1qKdid2S9fZdSrzLaCcjcF",
      externalLink: "https://open.spotify.com/track/1qKdid2S9fZdSrzLaCcjcF",
    },
  ],
} as const satisfies Track
