import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeJustLikeMagic = {
  id: "01a0a6c5-1f35-73f5-b2f5-ac4bbe6f9fdb",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-just-like-magic",
  ownLength: 2.4983333333333335,
  ownProgress: 2.4983333333333335,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "just like magic",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "justlikemagic|66CXWjxzNUsdJxJ2JdwvnR|149900",
  song: "song/ariana-grande-just-like-magic",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 4,
      externalId: "7Dx9Z6Aon1qPS2N0rHSWTe",
      externalLink: "https://open.spotify.com/track/7Dx9Z6Aon1qPS2N0rHSWTe",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "1N9hFgcgWYbGINUKjhvcK6",
      externalLink: "https://open.spotify.com/track/1N9hFgcgWYbGINUKjhvcK6",
    },
  ],
} as const satisfies Track
