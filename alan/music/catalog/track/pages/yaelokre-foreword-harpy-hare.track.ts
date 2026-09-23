import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordHarpyHare = {
  id: "01a0ce87-10ad-73a8-b79f-83d034adb93f",
  type: "page-type/track",
  slug: "yaelokre-foreword-harpy-hare",
  ownLength: 3.5417666666666667,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Harpy Hare",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "harpyhare|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|212506",
  song: "song/yaelokre-harpy-hare",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 2,
      externalId: "3QQVAOt2xne9Rt5HvzCrJD",
      externalLink: "https://open.spotify.com/track/3QQVAOt2xne9Rt5HvzCrJD",
    },
  ],
} as const satisfies Track
