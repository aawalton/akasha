import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiMothership = {
  id: "01a0b637-fa1f-70cb-974e-1058c53d84fb",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-mothership",
  ownLength: 2.2803666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44BDTmko2ek2ps6QQpFDw3",
      externalLink: "https://open.spotify.com/track/44BDTmko2ek2ps6QQpFDw3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mothership",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "mothership|1WgXqy2Dd70QQOU7Ay074N|136822",
  song: "song/aurora-mothership",
} as const satisfies Track
