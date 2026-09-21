import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveDancingInTheDark = {
  id: "01a0c43f-cb9c-73db-bf87-1a85b51dc7cd",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-dancing-in-the-dark",
  ownLength: 3.8988833333333335,
  ownProgress: 3.8988833333333335,
  partOfCollections: ["release/imagine-dragons-evolve"],
  position: 12,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3adVVrcE2KS26OL4rYd27O",
      externalLink: "https://open.spotify.com/track/3adVVrcE2KS26OL4rYd27O",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dancing In The Dark",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "dancinginthedark|53XhwfbYqKCa1cC15pYq2q|233933",
  song: "song/imagine-dragons-dancing-in-the-dark",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 12,
      externalId: "3adVVrcE2KS26OL4rYd27O",
      externalLink: "https://open.spotify.com/track/3adVVrcE2KS26OL4rYd27O",
    },
  ],
} as const satisfies Track
