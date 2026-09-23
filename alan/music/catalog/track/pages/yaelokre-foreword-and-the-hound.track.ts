import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordAndTheHound = {
  id: "01a0ce87-10f3-702d-8c4c-7d248e29c28d",
  type: "page-type/track",
  slug: "yaelokre-foreword-and-the-hound",
  ownLength: 3.7202166666666665,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "And the Hound",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "andthehound|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|223213",
  song: "song/yaelokre-and-the-hound",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 3,
      externalId: "3ltIAerCv33YRrYhXmLxjG",
      externalLink: "https://open.spotify.com/track/3ltIAerCv33YRrYhXmLxjG",
    },
  ],
} as const satisfies Track
