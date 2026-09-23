import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiInferior = {
  id: "01a0c622-1192-7d66-8ea4-b0972644e8a8",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-inferior",
  ownLength: 3.0486,
  ownProgress: 3.0486,
  partOfCollections: ["release/jessica-baio-sacred-ii", "release/jessica-baio-inferior"],
  status: "completed",
  unit: "unit/minutes",
  title: "inferior",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "inferior|0VMFTqmv0hYlWruyBERT95|182916",
  song: "song/jessica-baio-inferior",
  carriedBy: [
    {
      release: "release/jessica-baio-inferior",
      discNumber: 1,
      position: 1,
      externalId: "3HTDDOX255A8aECNemYVHh",
      externalLink: "https://open.spotify.com/track/3HTDDOX255A8aECNemYVHh",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 2,
      externalId: "2Ss2n79jPIXHSU2hXMcHww",
      externalLink: "https://open.spotify.com/track/2Ss2n79jPIXHSU2hXMcHww",
    },
  ],
} as const satisfies Track
