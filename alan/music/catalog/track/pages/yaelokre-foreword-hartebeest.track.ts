import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordHartebeest = {
  id: "01a0ce87-1069-776d-be6a-8ff02ba8f219",
  type: "page-type/track",
  slug: "yaelokre-foreword-hartebeest",
  ownLength: 3.1568833333333335,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hartebeest",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "hartebeest|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|189413",
  song: "song/yaelokre-hartebeest",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 1,
      externalId: "0wZtIm5soWBIKEL1649oYO",
      externalLink: "https://open.spotify.com/track/0wZtIm5soWBIKEL1649oYO",
    },
  ],
} as const satisfies Track
