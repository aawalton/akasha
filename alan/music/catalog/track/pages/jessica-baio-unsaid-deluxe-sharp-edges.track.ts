import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeSharpEdges = {
  id: "01a0c622-1621-7c26-9b35-cb60f1bff1fa",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-sharp-edges",
  ownLength: 2.18195,
  ownProgress: 2.18195,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "sharp edges",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "sharpedges|0VMFTqmv0hYlWruyBERT95|130917",
  song: "song/jessica-baio-sharp-edges",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 3,
      externalId: "286gupXZjhamOLS6d4Ogx1",
      externalLink: "https://open.spotify.com/track/286gupXZjhamOLS6d4Ogx1",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "74cr8tmXt7pAtILeUHaovI",
      externalLink: "https://open.spotify.com/track/74cr8tmXt7pAtILeUHaovI",
    },
  ],
} as const satisfies Track
