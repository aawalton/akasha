import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBoyfriendBoyfriendWithSocialHouse = {
  id: "01a0a6c5-3846-7ff2-96c5-2ae2acff66bd",
  type: "page-type/track",
  slug: "ariana-grande-boyfriend-boyfriend-with-social-house",
  ownLength: 3.101766666666667,
  ownProgress: 3.101766666666667,
  partOfCollections: ["release/ariana-grande-boyfriend"],
  status: "completed",
  unit: "unit/minutes",
  title: "boyfriend (with Social House)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Social House" }],
  trackKey: "boyfriendwithsocialhouse|5UjifI1TYefXWn9GdqDOHl,66CXWjxzNUsdJxJ2JdwvnR|186106",
  song: "song/ariana-grande-boyfriend",
  carriedBy: [
    {
      release: "release/ariana-grande-boyfriend",
      discNumber: 1,
      position: 1,
      externalId: "0Ryd8975WihbObpp5cPW1t",
      externalLink: "https://open.spotify.com/track/0Ryd8975WihbObpp5cPW1t",
    },
  ],
} as const satisfies Track
