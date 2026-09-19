import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightSomeTypeOfSkin = {
  id: "01a0b638-0009-7917-99d3-b3341916d393",
  type: "page-type/track",
  slug: "aurora-to-be-alright-some-type-of-skin",
  ownLength: 3.1888833333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-alright"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LK189UNYqDcUdCDDYIUNA",
      externalLink: "https://open.spotify.com/track/6LK189UNYqDcUdCDDYIUNA",
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
