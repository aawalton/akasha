import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassLineEmUp = {
  id: "01a0abeb-39d8-7572-b563-9df746600db6",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-line-em-up",
  ownLength: 4.708433333333334,
  ownProgress: 4.708433333333334,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Line 'Em Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "lineemup|0vn7UBvSQECKJm2817Yf1P|282506",
  song: "song/james-taylor-line-em-up",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 1,
      externalId: "5PbfvaBgQHwUI2NEilk9RN",
      externalLink: "https://open.spotify.com/track/5PbfvaBgQHwUI2NEilk9RN",
    },
  ],
} as const satisfies Track
