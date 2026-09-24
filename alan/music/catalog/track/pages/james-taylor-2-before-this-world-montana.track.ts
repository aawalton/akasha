import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldMontana = {
  id: "01a0abeb-305d-7b59-8f5f-433d1892e420",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-montana",
  ownLength: 3.425333333333333,
  ownProgress: 3.425333333333333,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  status: "completed",
  unit: "unit/minutes",
  title: "Montana",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "montana|0vn7UBvSQECKJm2817Yf1P|205520",
  song: "song/james-taylor-montana",
  carriedBy: [
    {
      release: "release/james-taylor-2-before-this-world",
      discNumber: 1,
      position: 5,
      externalId: "59ozpIwaP8CoDMpQwKdRLs",
      externalLink: "https://open.spotify.com/track/59ozpIwaP8CoDMpQwKdRLs",
    },
  ],
} as const satisfies Track
