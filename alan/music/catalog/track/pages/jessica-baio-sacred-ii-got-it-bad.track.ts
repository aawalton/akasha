import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiGotItBad = {
  id: "01a0c622-134f-7dfc-85c8-8ea18de272ce",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-got-it-bad",
  ownLength: 2.643466666666667,
  ownProgress: 2.643466666666667,
  partOfCollections: ["release/jessica-baio-sacred-ii", "release/jessica-baio-sacred"],
  status: "completed",
  unit: "unit/minutes",
  title: "got it bad",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "gotitbad|0VMFTqmv0hYlWruyBERT95|158608",
  song: "song/jessica-baio-got-it-bad",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 7,
      externalId: "4pWO1kX2hUtYR1T4QlXlwV",
      externalLink: "https://open.spotify.com/track/4pWO1kX2hUtYR1T4QlXlwV",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 7,
      externalId: "63MNDHpCqJyhnIiwmxGck8",
      externalLink: "https://open.spotify.com/track/63MNDHpCqJyhnIiwmxGck8",
    },
  ],
} as const satisfies Track
