import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiKissTell = {
  id: "01a0c622-0f86-7538-9954-b4d2e80dc2a5",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-kiss-tell",
  ownLength: 2.407766666666667,
  ownProgress: 2.407766666666667,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "kiss & tell",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "kisstell|0VMFTqmv0hYlWruyBERT95|144466",
  song: "song/jessica-baio-kiss-tell",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 7,
      externalId: "0s24tRDnWGLcHUnrMlkaBv",
      externalLink: "https://open.spotify.com/track/0s24tRDnWGLcHUnrMlkaBv",
    },
  ],
} as const satisfies Track
