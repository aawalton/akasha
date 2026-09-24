import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSomeDaysYouGottaDance = {
  id: "01a0abeb-342d-7de4-b5e0-e366feacfce9",
  type: "page-type/track",
  slug: "james-taylor-2-covers-some-days-you-gotta-dance",
  ownLength: 2.6568833333333335,
  ownProgress: 2.6568833333333335,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Some Days You Gotta Dance",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "somedaysyougottadance|0vn7UBvSQECKJm2817Yf1P|159413",
  song: "song/james-taylor-some-days-you-gotta-dance",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 5,
      externalId: "7wsuB1hxiDdWBVC9D5NZXn",
      externalLink: "https://open.spotify.com/track/7wsuB1hxiDdWBVC9D5NZXn",
    },
  ],
} as const satisfies Track
