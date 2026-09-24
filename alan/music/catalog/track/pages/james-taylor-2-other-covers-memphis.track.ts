import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversMemphis = {
  id: "01a0abeb-3325-7cc4-8cc1-7e0567c7a60b",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-memphis",
  ownLength: 3.1788833333333333,
  ownProgress: 3.1788833333333333,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Memphis",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "memphis|0vn7UBvSQECKJm2817Yf1P|190733",
  song: "song/james-taylor-memphis",
  carriedBy: [
    {
      release: "release/james-taylor-2-other-covers",
      discNumber: 1,
      position: 3,
      externalId: "4bRejQ7pYFZ4v1qAggqiA2",
      externalLink: "https://open.spotify.com/track/4bRejQ7pYFZ4v1qAggqiA2",
    },
  ],
} as const satisfies Track
