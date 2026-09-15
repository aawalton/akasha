import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverFree = {
  id: "01a0a5cd-5a6c-7774-ba4c-f1b53e38696e",
  type: "track",
  slug: "florence-the-machine-dance-fever-free",
  ownLength: 3.914283333333333,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7H7SHw3YWXhb4zYqyoPNa1",
      externalLink: "https://open.spotify.com/track/7H7SHw3YWXhb4zYqyoPNa1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Free",
} as const satisfies Track
