import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineBetweenTwoLungsDrummingSong = {
  id: "01a0a5cd-69b8-7965-a1ef-577e48072f2e",
  type: "track",
  slug: "florence-the-machine-between-two-lungs-drumming-song",
  ownLength: 3.7304333333333335,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-between-two-lungs"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2z2yJzK7W1Zsz8aL40toGS",
      externalLink: "https://open.spotify.com/track/2z2yJzK7W1Zsz8aL40toGS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Drumming Song",
} as const satisfies Track
