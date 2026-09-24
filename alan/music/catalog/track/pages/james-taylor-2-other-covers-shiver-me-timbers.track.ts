import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversShiverMeTimbers = {
  id: "01a0abeb-3341-7104-8395-461ae82f8510",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-shiver-me-timbers",
  ownLength: 4.324883333333333,
  ownProgress: 4.324883333333333,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shiver Me Timbers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "shivermetimbers|0vn7UBvSQECKJm2817Yf1P|259493",
  song: "song/james-taylor-shiver-me-timbers",
  carriedBy: [
    {
      release: "release/james-taylor-2-other-covers",
      discNumber: 1,
      position: 4,
      externalId: "0i9yAHlCCzP8p3mFWxLDNG",
      externalLink: "https://open.spotify.com/track/0i9yAHlCCzP8p3mFWxLDNG",
    },
  ],
} as const satisfies Track
