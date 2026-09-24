import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordKidLeveret = {
  id: "01a0ce87-1205-741e-b70c-91c5ea9f1ea8",
  type: "page-type/track",
  slug: "yaelokre-foreword-kid-leveret",
  ownLength: 4.939333333333333,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Kid & Leveret",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }, { artistName: "Keath Ósk" }],
  trackKey: "kidleveret|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|296360",
  song: "song/yaelokre-kid-leveret",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 7,
      externalId: "1rxY97YoxfdDjOkB3itUkF",
      externalLink: "https://open.spotify.com/track/1rxY97YoxfdDjOkB3itUkF",
    },
  ],
} as const satisfies Track
