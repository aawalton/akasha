import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeObvious = {
  id: "01a0a6c5-2041-7abd-8ef5-94718b1bc68a",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-obvious",
  ownLength: 2.4493,
  ownProgress: 2.4493,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "obvious",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "obvious|66CXWjxzNUsdJxJ2JdwvnR|146958",
  song: "song/ariana-grande-obvious",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 13,
      externalId: "0q85C1JiECyYIQthz1posA",
      externalLink: "https://open.spotify.com/track/0q85C1JiECyYIQthz1posA",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "65OEcDb4M3mAvEpSdXi6Lv",
      externalLink: "https://open.spotify.com/track/65OEcDb4M3mAvEpSdXi6Lv",
    },
  ],
} as const satisfies Track
