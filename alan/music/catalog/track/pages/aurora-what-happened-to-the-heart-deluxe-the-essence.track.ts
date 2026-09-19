import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheEssence = {
  id: "01a0b637-ec22-74fd-b5cb-f144f28f1d90",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-essence",
  ownLength: 3.16,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1A6KGfxjQLl7JQfCk20y27",
      externalLink: "https://open.spotify.com/track/1A6KGfxjQLl7JQfCk20y27",
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
