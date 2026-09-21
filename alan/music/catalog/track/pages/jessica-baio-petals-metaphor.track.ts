import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioPetalsMetaphor = {
  id: "01a0c622-1fb4-736d-88a3-1a65811a3604",
  type: "page-type/track",
  slug: "jessica-baio-petals-metaphor",
  ownLength: 2.3220666666666667,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-petals"],
  status: "not-started",
  unit: "unit/minutes",
  title: "metaphor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "metaphor|0VMFTqmv0hYlWruyBERT95|139324",
  song: "song/jessica-baio-metaphor",
  carriedBy: [
    {
      release: "release/jessica-baio-petals",
      discNumber: 1,
      position: 6,
      externalId: "3lp6AkhUMQztZFJpkCwQJQ",
      externalLink: "https://open.spotify.com/track/3lp6AkhUMQztZFJpkCwQJQ",
    },
  ],
} as const satisfies Track
