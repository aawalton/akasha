import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynSidetrackedSidetracked = {
  id: "01a0b9ec-96cc-74ee-bae4-03c971bebc14",
  type: "page-type/track",
  slug: "chaislyn-sidetracked-sidetracked",
  ownLength: 2.9923,
  ownProgress: 2.9923,
  partOfCollections: ["release/chaislyn-sidetracked"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sidetracked",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/chaislyn" }],
  trackKey: "sidetracked|3zmbniiciaBAJlSX1Bzq9R|179538",
  song: "song/chaislyn-sidetracked",
  carriedBy: [
    {
      release: "release/chaislyn-sidetracked",
      discNumber: 1,
      position: 1,
      externalId: "649ukvV0AAe4KetOfP9vY9",
      externalLink: "https://open.spotify.com/track/649ukvV0AAe4KetOfP9vY9",
    },
  ],
} as const satisfies Track
