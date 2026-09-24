import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeLovesNotPain = {
  id: "01a0c622-1bed-7715-802b-7c0434a19bd4",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-loves-not-pain",
  ownLength: 2.44725,
  ownProgress: 2.44725,
  partOfCollections: [
    "release/jessica-baio-unsaid-deluxe",
    "release/jessica-baio-unsaid",
    "release/jessica-baio-love-s-not-pain",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "love's not pain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "lovesnotpain|0VMFTqmv0hYlWruyBERT95|146835",
  song: "song/jessica-baio-love-s-not-pain",
  carriedBy: [
    {
      release: "release/jessica-baio-love-s-not-pain",
      discNumber: 1,
      position: 1,
      externalId: "2mElFGDLWCZnuyHt6APKdl",
      externalLink: "https://open.spotify.com/track/2mElFGDLWCZnuyHt6APKdl",
    },
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 11,
      externalId: "1KArCQVtgHchG0Nbdq6non",
      externalLink: "https://open.spotify.com/track/1KArCQVtgHchG0Nbdq6non",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "5GuE2lWvAsf5AKJT6AAufa",
      externalLink: "https://open.spotify.com/track/5GuE2lWvAsf5AKJT6AAufa",
    },
  ],
} as const satisfies Track
