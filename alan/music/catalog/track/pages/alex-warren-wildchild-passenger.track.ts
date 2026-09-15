import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenWildchildPassenger = {
  id: "01a0a59d-c777-77dd-9751-9af96d6a323d",
  type: "page-type/track",
  slug: "alex-warren-wildchild-passenger",
  ownLength: 2.66285,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-wildchild"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BSeso8HRRJVQzYdKi1YOX",
      externalLink: "https://open.spotify.com/track/4BSeso8HRRJVQzYdKi1YOX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "PASSENGER",
} as const satisfies Track
