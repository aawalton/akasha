import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNotAgainNotAgain = {
  id: "01a0c621-22fd-7d3a-8a6c-8cd35ae2a61d",
  type: "page-type/track",
  slug: "jenna-raine-not-again-not-again",
  ownLength: 3.6110166666666665,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-not-again"],
  status: "not-started",
  unit: "unit/minutes",
  title: "NOT AGAIN",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "notagain|3aHe9rMa5HFTjXHw8tEz0A|216661",
  song: "song/jenna-raine-not-again",
  carriedBy: [
    {
      release: "release/jenna-raine-not-again",
      discNumber: 1,
      position: 1,
      externalId: "6HXvariUkMlkUgg9qzLTc2",
      externalLink: "https://open.spotify.com/track/6HXvariUkMlkUgg9qzLTc2",
    },
  ],
} as const satisfies Track
