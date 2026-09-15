import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAmarantineAmarantine = {
  id: "01a0a5b0-2274-7879-91fd-4d8f8c081de2",
  type: "track",
  slug: "enya-amarantine-amarantine",
  ownLength: 3.124433333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-amarantine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sUXXt6VKFP4czrn1JVi4v",
      externalLink: "https://open.spotify.com/track/4sUXXt6VKFP4czrn1JVi4v",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Amarantine",
} as const satisfies Track
