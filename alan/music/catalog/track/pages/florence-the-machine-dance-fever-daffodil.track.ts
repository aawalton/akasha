import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverDaffodil = {
  id: "01a0a5cd-5bce-7939-8ef4-31de6b2feae9",
  type: "page-type/track",
  slug: "florence-the-machine-dance-fever-daffodil",
  ownLength: 3.5674333333333332,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3EIgAuegl9y3MKfYyNb8jS",
      externalLink: "https://open.spotify.com/track/3EIgAuegl9y3MKfYyNb8jS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Daffodil",
} as const satisfies Track
