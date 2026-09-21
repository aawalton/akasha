import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsAmsterdam = {
  id: "01a0c43f-d51f-7ed6-8f72-729ca363c3e0",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-amsterdam",
  ownLength: 4.023766666666667,
  ownProgress: 4.023766666666667,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46bkeaB7DA45q7PdKWLFkR",
      externalLink: "https://open.spotify.com/track/46bkeaB7DA45q7PdKWLFkR",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Amsterdam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "amsterdam|53XhwfbYqKCa1cC15pYq2q|241426",
  song: "song/imagine-dragons-amsterdam",
} as const satisfies Track
