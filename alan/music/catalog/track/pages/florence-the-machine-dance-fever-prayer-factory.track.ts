import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverPrayerFactory = {
  id: "01a0a5cd-5b53-7d22-80e0-dc12616405bb",
  type: "track",
  slug: "florence-the-machine-dance-fever-prayer-factory",
  ownLength: 1.2241666666666666,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5evz6ANSQQI09Q1p8aGNCH",
      externalLink: "https://open.spotify.com/track/5evz6ANSQQI09Q1p8aGNCH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Prayer Factory",
} as const satisfies Track
