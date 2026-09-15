import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaBeautifulPeopleBeautifulPeople = {
  id: "01a0a59c-1bfc-7301-b773-f81ee922d97b",
  type: "track",
  slug: "sia-beautiful-people-beautiful-people",
  ownLength: 3.1181,
  ownProgress: 0,
  partOfCollections: ["release/sia-beautiful-people"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TwEdnSiTPDR1vg1QZ5K8W",
      externalLink: "https://open.spotify.com/track/4TwEdnSiTPDR1vg1QZ5K8W",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Beautiful People",
} as const satisfies Track
