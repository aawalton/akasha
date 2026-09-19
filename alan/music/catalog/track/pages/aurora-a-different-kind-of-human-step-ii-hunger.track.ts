import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiHunger = {
  id: "01a0b637-f93a-7c9a-9e0b-cbe264b7e921",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-hunger",
  ownLength: 2.78155,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "68B8724ICtxBv3wUFxdro3",
      externalLink: "https://open.spotify.com/track/68B8724ICtxBv3wUFxdro3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hunger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "hunger|1WgXqy2Dd70QQOU7Ay074N|166893",
  song: "song/aurora-hunger",
} as const satisfies Track
