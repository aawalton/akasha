import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartToBeAlright = {
  id: "01a0b637-eeaf-7afd-aa07-0f6b3b5945d4",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-to-be-alright",
  ownLength: 4.094,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lFk7chcfSypqoZRzdaswz",
      externalLink: "https://open.spotify.com/track/3lFk7chcfSypqoZRzdaswz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Alright",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "tobealright|1WgXqy2Dd70QQOU7Ay074N|245640",
  song: "song/aurora-to-be-alright",
} as const satisfies Track
