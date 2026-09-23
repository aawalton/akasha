import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordKeathsResponse = {
  id: "01a0ce87-12c1-7c4d-94ad-12259c4f49dd",
  type: "page-type/track",
  slug: "yaelokre-foreword-keaths-response",
  ownLength: 2.6422166666666667,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Keath's Response",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" },
    { externalId: "5nS4Ohh7IG844fp1Eu1GMI", artistName: "Keath Ósk" },
  ],
  trackKey: "keathsresponse|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|158533",
  song: "song/yaelokre-keaths-response",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 10,
      externalId: "17kkHEfpiJYP2ZcuEK4d4y",
      externalLink: "https://open.spotify.com/track/17kkHEfpiJYP2ZcuEK4d4y",
    },
  ],
} as const satisfies Track
