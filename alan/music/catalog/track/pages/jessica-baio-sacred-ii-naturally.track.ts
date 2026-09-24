import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiNaturally = {
  id: "01a0c622-0ed7-7755-ba25-84efdb781e4e",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-naturally",
  ownLength: 2.739,
  ownProgress: 2.739,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "naturally",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "naturally|0VMFTqmv0hYlWruyBERT95|164340",
  song: "song/jessica-baio-naturally",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 3,
      externalId: "30BGzWj94rwbHldgRP50xP",
      externalLink: "https://open.spotify.com/track/30BGzWj94rwbHldgRP50xP",
    },
  ],
} as const satisfies Track
