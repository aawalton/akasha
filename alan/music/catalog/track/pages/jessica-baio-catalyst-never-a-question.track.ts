import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystNeverAQuestion = {
  id: "01a0c622-22a3-7cbe-97b9-4a1bb75cbd00",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-never-a-question",
  ownLength: 2.7449333333333334,
  ownProgress: 2.7449333333333334,
  partOfCollections: ["release/jessica-baio-catalyst", "release/jessica-baio-never-a-question"],
  status: "completed",
  unit: "unit/minutes",
  title: "never a question",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "neveraquestion|0VMFTqmv0hYlWruyBERT95|164696",
  song: "song/jessica-baio-never-a-question",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 6,
      externalId: "3PbuViY3aOImO2NdVyC0Dj",
      externalLink: "https://open.spotify.com/track/3PbuViY3aOImO2NdVyC0Dj",
    },
    {
      release: "release/jessica-baio-never-a-question",
      discNumber: 1,
      position: 1,
      externalId: "5GmIyk4xXCXboHlRSDw869",
      externalLink: "https://open.spotify.com/track/5GmIyk4xXCXboHlRSDw869",
    },
  ],
} as const satisfies Track
