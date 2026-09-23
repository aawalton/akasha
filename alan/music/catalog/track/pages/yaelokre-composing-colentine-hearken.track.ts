import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreComposingColentineHearken = {
  id: "01a0ce87-142e-77a1-907b-7f46df6dd8cc",
  type: "page-type/track",
  slug: "yaelokre-composing-colentine-hearken",
  ownLength: 6.194516666666667,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-composing-colentine", "release/yaelokre-hearken"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hearken",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" }],
  trackKey: "hearken|3rRyfgGByetsaaujkjQ7rY|371671",
  song: "song/yaelokre-hearken",
  carriedBy: [
    {
      release: "release/yaelokre-composing-colentine",
      discNumber: 1,
      position: 5,
      externalId: "1phLqArJQHDefJR4CDPoJW",
      externalLink: "https://open.spotify.com/track/1phLqArJQHDefJR4CDPoJW",
    },
    {
      release: "release/yaelokre-hearken",
      discNumber: 1,
      position: 1,
      externalId: "4xEBLCaklcfiEk0d6BIeZe",
      externalLink: "https://open.spotify.com/track/4xEBLCaklcfiEk0d6BIeZe",
    },
  ],
} as const satisfies Track
