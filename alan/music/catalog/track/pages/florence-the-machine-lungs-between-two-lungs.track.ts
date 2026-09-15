import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsBetweenTwoLungs = {
  id: "01a0a5cd-729a-7a46-a083-bae0ed6f307d",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-between-two-lungs",
  ownLength: 4.154,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5w7sVlGwbDE72HH9OzpDXw",
      externalLink: "https://open.spotify.com/track/5w7sVlGwbDE72HH9OzpDXw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Between Two Lungs",
} as const satisfies Track
