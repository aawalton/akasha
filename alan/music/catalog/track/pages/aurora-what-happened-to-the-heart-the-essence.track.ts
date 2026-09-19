import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartTheEssence = {
  id: "01a0b637-ef51-79f4-a630-19f94023fd62",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-the-essence",
  ownLength: 3.16,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Q48Cy1g2vgETUmkSsccPl",
      externalLink: "https://open.spotify.com/track/2Q48Cy1g2vgETUmkSsccPl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Essence",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theessence|1WgXqy2Dd70QQOU7Ay074N|189600",
  song: "song/aurora-the-essence",
} as const satisfies Track
