import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyHomeForTheHolidays = {
  id: "01a0d52b-52dc-7f48-a859-ff09809096b0",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-home-for-the-holidays",
  ownLength: 3.212083333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Home for the Holidays",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "homefortheholidays|1AFSUleuDTapVhm5zUf4ix|192725",
  song: "song/rockapella-home-for-the-holidays",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 7,
      externalId: "0YJ34EerCTHrgZTOwAEWAQ",
      externalLink: "https://open.spotify.com/track/0YJ34EerCTHrgZTOwAEWAQ",
    },
  ],
} as const satisfies Track
