import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMidasTouchMidasTouch = {
  id: "01a0b638-043b-736a-ab22-5f39a1fde802",
  type: "page-type/track",
  slug: "aurora-midas-touch-midas-touch",
  ownLength: 2.6944333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-midas-touch"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3X1LFB1AFXohRiWa1Cryuv",
      externalLink: "https://open.spotify.com/track/3X1LFB1AFXohRiWa1Cryuv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Midas Touch",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "midastouch|1WgXqy2Dd70QQOU7Ay074N|161666",
  song: "song/aurora-midas-touch",
} as const satisfies Track
