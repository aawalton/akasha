import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungValentinesDay = {
  id: "01a0abeb-4118-79a9-a120-58e8b86f328d",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-valentines-day",
  ownLength: 2.588433333333333,
  ownProgress: 2.588433333333333,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 5,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xqPLj6Icd85nKRstenuQx",
      externalLink: "https://open.spotify.com/track/4xqPLj6Icd85nKRstenuQx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Valentine's Day",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
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
