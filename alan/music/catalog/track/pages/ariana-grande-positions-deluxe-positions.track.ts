import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxePositions = {
  id: "01a0a6c5-2024-7aef-943f-2bb86d1e5f22",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-positions",
  ownLength: 2.8720666666666665,
  ownProgress: 2.8720666666666665,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "positions",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "positions|66CXWjxzNUsdJxJ2JdwvnR|172324",
  song: "song/ariana-grande-positions",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 12,
      externalId: "35mvY5S1H3J2QZyna3TFe0",
      externalLink: "https://open.spotify.com/track/35mvY5S1H3J2QZyna3TFe0",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "3DFnLXa69NVlOjbhTbXXNn",
      externalLink: "https://open.spotify.com/track/3DFnLXa69NVlOjbhTbXXNn",
    },
  ],
} as const satisfies Track
