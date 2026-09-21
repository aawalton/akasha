import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenMine = {
  id: "01a0c621-28cc-7284-9ecd-6a3b64e1fbc4",
  type: "page-type/track",
  slug: "jenna-raine-nen-mine",
  ownLength: 3.4219,
  ownProgress: 3.4219,
  partOfCollections: ["release/jenna-raine-nen"],
  status: "completed",
  unit: "unit/minutes",
  title: "mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "mine|3aHe9rMa5HFTjXHw8tEz0A|205314",
  song: "song/jenna-raine-mine",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 3,
      externalId: "3ri2PIoPz4hXAMkOshOGHU",
      externalLink: "https://open.spotify.com/track/3ri2PIoPz4hXAMkOshOGHU",
    },
  ],
} as const satisfies Track
