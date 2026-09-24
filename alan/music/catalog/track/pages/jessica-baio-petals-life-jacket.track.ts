import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioPetalsLifeJacket = {
  id: "01a0c622-2005-7e2e-afeb-3b077bb01532",
  type: "page-type/track",
  slug: "jessica-baio-petals-life-jacket",
  ownLength: 2.7322,
  ownProgress: 2.7322,
  partOfCollections: ["release/jessica-baio-petals"],
  status: "completed",
  unit: "unit/minutes",
  title: "life jacket",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "lifejacket|0VMFTqmv0hYlWruyBERT95|163932",
  song: "song/jessica-baio-life-jacket",
  carriedBy: [
    {
      release: "release/jessica-baio-petals",
      discNumber: 1,
      position: 8,
      externalId: "1CIY5EjWVr1qF3TMWfwPhG",
      externalLink: "https://open.spotify.com/track/1CIY5EjWVr1qF3TMWfwPhG",
    },
  ],
} as const satisfies Track
