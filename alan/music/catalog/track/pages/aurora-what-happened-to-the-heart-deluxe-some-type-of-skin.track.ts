import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeSomeTypeOfSkin = {
  id: "01a0b637-ebf8-7bfa-8e88-362b02d6eaf0",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-some-type-of-skin",
  ownLength: 3.1888833333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KKChIbIZku9GCTkR2gzXM",
      externalLink: "https://open.spotify.com/track/4KKChIbIZku9GCTkR2gzXM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Some Type Of Skin",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "sometypeofskin|1WgXqy2Dd70QQOU7Ay074N|191333",
  song: "song/aurora-some-type-of-skin",
} as const satisfies Track
