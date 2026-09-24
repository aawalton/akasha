import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungValentinesDay = {
  id: "01a0abeb-4118-79a9-a120-58e8b86f328d",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-valentines-day",
  ownLength: 2.588433333333333,
  ownProgress: 2.588433333333333,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Valentine's Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "valentinesday|0vn7UBvSQECKJm2817Yf1P|155306",
  song: "song/james-taylor-valentines-day",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 5,
      externalId: "4xqPLj6Icd85nKRstenuQx",
      externalLink: "https://open.spotify.com/track/4xqPLj6Icd85nKRstenuQx",
    },
  ],
} as const satisfies Track
