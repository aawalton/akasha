import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomKid = {
  id: "01a0c43f-b567-7527-bb59-eee31f316878",
  type: "page-type/track",
  slug: "imagine-dragons-loom-kid",
  ownLength: 2.6631,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-loom"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4PPK3VK5iDF7Vqmey65li2",
      externalLink: "https://open.spotify.com/track/4PPK3VK5iDF7Vqmey65li2",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Kid",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "kid|53XhwfbYqKCa1cC15pYq2q|159786",
  song: "song/imagine-dragons-kid",
} as const satisfies Track
