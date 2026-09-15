import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedSaveYou = {
  id: "01a0a5ae-c85f-7578-ad80-79dc55372ad6",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-save-you",
  ownLength: 4.0351,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IaJyaE8pCQjOgvXUAJeat",
      externalLink: "https://open.spotify.com/track/7IaJyaE8pCQjOgvXUAJeat",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Save You",
} as const satisfies Track
