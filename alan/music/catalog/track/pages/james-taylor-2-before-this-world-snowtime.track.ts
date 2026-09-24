import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldSnowtime = {
  id: "01a0abeb-3095-7114-82b1-a9c3a6b176b4",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-snowtime",
  ownLength: 5.8091,
  ownProgress: 5.8091,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  status: "completed",
  unit: "unit/minutes",
  title: "SnowTime",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "snowtime|0vn7UBvSQECKJm2817Yf1P|348546",
  song: "song/james-taylor-snowtime",
  carriedBy: [
    {
      release: "release/james-taylor-2-before-this-world",
      discNumber: 1,
      position: 7,
      externalId: "0ciNBuuJYP1EvG8LDpShWk",
      externalLink: "https://open.spotify.com/track/0ciNBuuJYP1EvG8LDpShWk",
    },
  ],
} as const satisfies Track
