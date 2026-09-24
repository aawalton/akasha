import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchHeathens = {
  id: "01a0b637-f4c9-7b32-85d0-52e1939d1945",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-heathens",
  ownLength: 3.75155,
  ownProgress: 3.75155,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "Heathens",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "heathens|1WgXqy2Dd70QQOU7Ay074N|225093",
  song: "song/aurora-heathens",
  carriedBy: [
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 7,
      externalId: "1wtFmvGQtqWahPLVTlrr0K",
      externalLink: "https://open.spotify.com/track/1wtFmvGQtqWahPLVTlrr0K",
    },
  ],
} as const satisfies Track
