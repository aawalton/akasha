import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeOneLastTimeOneLastTimeACappella = {
  id: "01a0a6c5-3cab-7a2a-b240-d97609c7dd59",
  type: "page-type/track",
  slug: "ariana-grande-one-last-time-one-last-time-a-cappella",
  ownLength: 3.314766666666667,
  ownProgress: 3.314766666666667,
  partOfCollections: ["release/ariana-grande-one-last-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Last Time - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "onelasttimeacappella|66CXWjxzNUsdJxJ2JdwvnR|198886",
  song: "song/ariana-grande-one-last-time",
  carriedBy: [
    {
      release: "release/ariana-grande-one-last-time",
      discNumber: 1,
      position: 2,
      externalId: "1FbQhFSuQErbCGRwY61jxA",
      externalLink: "https://open.spotify.com/track/1FbQhFSuQErbCGRwY61jxA",
    },
  ],
} as const satisfies Track
