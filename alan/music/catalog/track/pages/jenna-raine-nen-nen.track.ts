import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenNen = {
  id: "01a0c621-2993-74a9-ac01-20c676e794bd",
  type: "page-type/track",
  slug: "jenna-raine-nen-nen",
  ownLength: 1.4368666666666667,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-nen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "nen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "nen|3aHe9rMa5HFTjXHw8tEz0A|86212",
  song: "song/jenna-raine-nen",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 6,
      externalId: "3VFOHgrLJfORbumuZT8vqf",
      externalLink: "https://open.spotify.com/track/3VFOHgrLJfORbumuZT8vqf",
    },
  ],
} as const satisfies Track
