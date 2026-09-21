import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeToBeAlright = {
  id: "01a0b637-eb8b-781b-b28b-f1af71f60a0d",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-to-be-alright",
  ownLength: 4.094,
  ownProgress: 4.094,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JfcOx1IlM78JQPLC2n6ji",
      externalLink: "https://open.spotify.com/track/4JfcOx1IlM78JQPLC2n6ji",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Alright",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "tobealright|1WgXqy2Dd70QQOU7Ay074N|245640",
  song: "song/aurora-to-be-alright",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "4JfcOx1IlM78JQPLC2n6ji",
      externalLink: "https://open.spotify.com/track/4JfcOx1IlM78JQPLC2n6ji",
    },
  ],
} as const satisfies Track
