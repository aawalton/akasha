import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenYou = {
  id: "01a0c621-290d-7df4-8eb2-5084e65547f6",
  type: "page-type/track",
  slug: "jenna-raine-nen-you",
  ownLength: 2.3956,
  ownProgress: 2.3956,
  partOfCollections: ["release/jenna-raine-nen"],
  status: "completed",
  unit: "unit/minutes",
  title: "you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "you|3aHe9rMa5HFTjXHw8tEz0A|143736",
  song: "song/jenna-raine-you",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 4,
      externalId: "4HGaVAOsn5hBnJurJFWydQ",
      externalLink: "https://open.spotify.com/track/4HGaVAOsn5hBnJurJFWydQ",
    },
  ],
} as const satisfies Track
