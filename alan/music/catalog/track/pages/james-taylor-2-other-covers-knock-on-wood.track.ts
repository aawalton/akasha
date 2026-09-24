import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversKnockOnWood = {
  id: "01a0abeb-3397-7a87-8172-976fa575918f",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-knock-on-wood",
  ownLength: 3.8688833333333332,
  ownProgress: 3.8688833333333332,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Knock On Wood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "knockonwood|0vn7UBvSQECKJm2817Yf1P|232133",
  song: "song/james-taylor-knock-on-wood",
  carriedBy: [
    {
      release: "release/james-taylor-2-other-covers",
      discNumber: 1,
      position: 7,
      externalId: "1AOJ3y1KKpt19Mzd1MyiJT",
      externalLink: "https://open.spotify.com/track/1AOJ3y1KKpt19Mzd1MyiJT",
    },
  ],
} as const satisfies Track
