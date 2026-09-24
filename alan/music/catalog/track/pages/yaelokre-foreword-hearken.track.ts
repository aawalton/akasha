import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreForewordHearken = {
  id: "01a0ce87-12fe-7919-a0cf-65d2d128f161",
  type: "page-type/track",
  slug: "yaelokre-foreword-hearken",
  ownLength: 3.6331,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-foreword"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hearken",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }, { artistName: "Keath Ósk" }],
  trackKey: "hearken|3rRyfgGByetsaaujkjQ7rY,5nS4Ohh7IG844fp1Eu1GMI|217986",
  song: "song/yaelokre-hearken",
  carriedBy: [
    {
      release: "release/yaelokre-foreword",
      discNumber: 1,
      position: 11,
      externalId: "053YVcun37YnFMDk5T5pfG",
      externalLink: "https://open.spotify.com/track/053YVcun37YnFMDk5T5pfG",
    },
  ],
} as const satisfies Track
