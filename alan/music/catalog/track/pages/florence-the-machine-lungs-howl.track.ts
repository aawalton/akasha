import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsHowl = {
  id: "01a0a5cd-71cc-7f97-9ec6-7547ae37d7b1",
  type: "track",
  slug: "florence-the-machine-lungs-howl",
  ownLength: 3.56755,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3OGUg0CBNaw87qfuzyiORP",
      externalLink: "https://open.spotify.com/track/3OGUg0CBNaw87qfuzyiORP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Howl",
} as const satisfies Track
