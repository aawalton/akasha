import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSkinAcousticSkinAcoustic = {
  id: "01a0c622-23dd-7980-b9df-c39041edf558",
  type: "page-type/track",
  slug: "jessica-baio-skin-acoustic-skin-acoustic",
  ownLength: 3.324533333333333,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-skin-acoustic"],
  status: "not-started",
  unit: "unit/minutes",
  title: "skin - acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "skinacoustic|0VMFTqmv0hYlWruyBERT95|199472",
  song: "song/jessica-baio-skin",
  carriedBy: [
    {
      release: "release/jessica-baio-skin-acoustic",
      discNumber: 1,
      position: 1,
      externalId: "6gzeLRJwFCJjkvEevudVKO",
      externalLink: "https://open.spotify.com/track/6gzeLRJwFCJjkvEevudVKO",
    },
  ],
} as const satisfies Track
