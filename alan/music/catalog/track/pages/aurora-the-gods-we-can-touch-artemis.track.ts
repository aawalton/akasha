import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchArtemis = {
  id: "01a0b637-f58b-73a0-bef5-51a5fd78fdc5",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-artemis",
  ownLength: 2.641766666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0AugTLXmK63udaMMrDmgdy",
      externalLink: "https://open.spotify.com/track/0AugTLXmK63udaMMrDmgdy",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Artemis",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "artemis|1WgXqy2Dd70QQOU7Ay074N|158506",
  song: "song/aurora-artemis",
} as const satisfies Track
