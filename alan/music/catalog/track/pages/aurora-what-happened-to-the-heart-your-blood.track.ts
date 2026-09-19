import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartYourBlood = {
  id: "01a0b637-eed6-71fe-82fb-1c936123ccb4",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-your-blood",
  ownLength: 4.124883333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6PbC1xivXYIWLXHDIC2Qd2",
      externalLink: "https://open.spotify.com/track/6PbC1xivXYIWLXHDIC2Qd2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Your Blood",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "yourblood|1WgXqy2Dd70QQOU7Ay074N|247493",
  song: "song/aurora-your-blood",
} as const satisfies Track
