import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverChoreomania = {
  id: "01a0a5cd-5a9e-7899-822a-b586953915f1",
  type: "page-type/track",
  slug: "florence-the-machine-dance-fever-choreomania",
  ownLength: 3.5517,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xdHw4C522RbsxHL9KD9L6",
      externalLink: "https://open.spotify.com/track/7xdHw4C522RbsxHL9KD9L6",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Choreomania",
} as const satisfies Track
