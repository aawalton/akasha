import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveOnlyOne = {
  id: "01a0abeb-3ea0-774c-b291-2232d43f6b4b",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-only-one",
  ownLength: 4.626666666666667,
  ownProgress: 4.626666666666667,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "onlyone|0vn7UBvSQECKJm2817Yf1P|277600",
  song: "song/james-taylor-only-one",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 10,
      externalId: "0hmp9bxoJUKT9hFJNCikRN",
      externalLink: "https://open.spotify.com/track/0hmp9bxoJUKT9hFJNCikRN",
    },
  ],
} as const satisfies Track
