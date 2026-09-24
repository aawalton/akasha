import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTheWay = {
  id: "01a0a6c5-3052-7a07-b78d-9568513e9866",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-the-way",
  ownLength: 3.7837666666666667,
  ownProgress: 3.7837666666666667,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Mac Miller" }],
  trackKey: "theway|4LLpKhyESsyAXpc4laK94U,66CXWjxzNUsdJxJ2JdwvnR|227026",
  song: "song/ariana-grande-the-way",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 8,
      externalId: "06EL94D0TA27Ik0Ke5usbj",
      externalLink: "https://open.spotify.com/track/06EL94D0TA27Ik0Ke5usbj",
    },
  ],
} as const satisfies Track
