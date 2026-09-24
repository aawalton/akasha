import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungHomeByAnotherWay = {
  id: "01a0abeb-416f-7488-b450-bbcb7e14ef89",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-home-by-another-way",
  ownLength: 3.8466666666666667,
  ownProgress: 3.8466666666666667,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Home by Another Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "homebyanotherway|0vn7UBvSQECKJm2817Yf1P|230800",
  song: "song/james-taylor-home-by-another-way",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 8,
      externalId: "1FcDdDUOtMyoljOkxNuYOr",
      externalLink: "https://open.spotify.com/track/1FcDdDUOtMyoljOkxNuYOr",
    },
  ],
} as const satisfies Track
