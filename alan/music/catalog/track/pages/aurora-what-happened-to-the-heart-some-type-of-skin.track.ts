import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartSomeTypeOfSkin = {
  id: "01a0b637-ef28-7cf3-9084-8fe9db210071",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-some-type-of-skin",
  ownLength: 3.1888833333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mWkmMkc66lRlJP4hTkv9N",
      externalLink: "https://open.spotify.com/track/0mWkmMkc66lRlJP4hTkv9N",
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
