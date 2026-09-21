import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsRootsRoots = {
  id: "01a0c43f-df78-78b0-b1ee-1e6f6b4a60f7",
  type: "page-type/track",
  slug: "imagine-dragons-roots-roots",
  ownLength: 2.9084333333333334,
  ownProgress: 2.9084333333333334,
  partOfCollections: ["release/imagine-dragons-roots"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GITtbZtRCQXhWLMXrWXHt",
      externalLink: "https://open.spotify.com/track/4GITtbZtRCQXhWLMXrWXHt",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Roots",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "roots|53XhwfbYqKCa1cC15pYq2q|174506",
  song: "song/imagine-dragons-roots",
  carriedBy: [
    {
      release: "release/imagine-dragons-roots",
      discNumber: 1,
      position: 1,
      externalId: "4GITtbZtRCQXhWLMXrWXHt",
      externalLink: "https://open.spotify.com/track/4GITtbZtRCQXhWLMXrWXHt",
    },
  ],
} as const satisfies Track
