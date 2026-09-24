import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassEnoughToBeOnYourWay = {
  id: "01a0abeb-39fd-721e-91de-f8128d226647",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-enough-to-be-on-your-way",
  ownLength: 5.448883333333334,
  ownProgress: 5.448883333333334,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Enough To Be On Your Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "enoughtobeonyourway|0vn7UBvSQECKJm2817Yf1P|326933",
  song: "song/james-taylor-enough-to-be-on-your-way",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 2,
      externalId: "153KKNnw2TZh4L1FiqggRp",
      externalLink: "https://open.spotify.com/track/153KKNnw2TZh4L1FiqggRp",
    },
  ],
} as const satisfies Track
