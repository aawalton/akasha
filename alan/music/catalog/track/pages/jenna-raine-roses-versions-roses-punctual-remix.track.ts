import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineRosesVersionsRosesPunctualRemix = {
  id: "01a0c621-1d85-7dc4-a8e5-e60019402d0b",
  type: "page-type/track",
  slug: "jenna-raine-roses-versions-roses-punctual-remix",
  ownLength: 3.3358833333333333,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-roses-versions"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Roses - Punctual Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" },
    { externalId: "1ocnIbhFWM9bSPrd7Hu4zF", artistName: "Punctual" },
  ],
  trackKey: "rosespunctualremix|1ocnIbhFWM9bSPrd7Hu4zF,3aHe9rMa5HFTjXHw8tEz0A|200153",
  song: "song/jenna-raine-roses",
  carriedBy: [
    {
      release: "release/jenna-raine-roses-versions",
      discNumber: 1,
      position: 7,
      externalId: "5WZqPsuuxNgBmdGw6GRkUD",
      externalLink: "https://open.spotify.com/track/5WZqPsuuxNgBmdGw6GRkUD",
    },
  ],
} as const satisfies Track
