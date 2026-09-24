import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeDelayed = {
  id: "01a0b4c8-3ee2-71f8-a0a7-6db20a3188fb",
  type: "page-type/track",
  slug: "paul-cardall-new-life-delayed",
  ownLength: 2.9953333333333334,
  ownProgress: 2.9953333333333334,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Delayed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "delayed|7FQRbf8gbKw8KZQZAJWxH2|179720",
  song: "song/paul-cardall-delayed",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 3,
      externalId: "5lfE6xJbmgrcqcEF6ehzqy",
      externalLink: "https://open.spotify.com/track/5lfE6xJbmgrcqcEF6ehzqy",
    },
  ],
} as const satisfies Track
